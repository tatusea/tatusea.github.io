document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const balls = document.querySelectorAll('.ball');
    
    function generateNumber() {
        // Generate numbers from 0 to 45 (inclusive)
        const num = Math.floor(Math.random() * 46);
        // Convert to string and pad with leading zero if needed
        return num.toString().padStart(2, '0');
    }

    function animateBall(ball, number, delay) {
        setTimeout(() => {
            ball.classList.add('animate');
            
            let counter = 0;
            const interval = setInterval(() => {
                ball.textContent = generateNumber();
                counter++;
                
                if (counter >= 20) {
                    clearInterval(interval);
                    ball.textContent = number;
                    ball.classList.add('selected');
                    
                    setTimeout(() => {
                        ball.classList.remove('animate');
                    }, 500);
                }
            }, 50);
        }, delay);
    }

    generateBtn.addEventListener('click', () => {
        generateBtn.disabled = true;
        
        balls.forEach(ball => {
            ball.classList.remove('selected');
            ball.classList.remove('animate');
        });
        
        // Create an array of all possible numbers (0-45)
        const possibleNumbers = Array.from({length: 46}, (_, i) => i.toString().padStart(2, '0'));
        const selectedNumbers = [];
        
        // Randomly select 6 unique numbers
        for(let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
            selectedNumbers.push(possibleNumbers.splice(randomIndex, 1)[0]);
        }
        
        // Animate each ball with a delay
        balls.forEach((ball, index) => {
            animateBall(ball, selectedNumbers[index], index * 300);
        });
        
        setTimeout(() => {
            generateBtn.disabled = false;
        }, 2500);
    });
});