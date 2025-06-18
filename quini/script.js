document.addEventListener('DOMContentLoaded', () => {
    // This script handles the logic for a lottery number generator.
    // It animates the selection of 6 unique numbers out of 46.
    const MAX_NUMBER_EXCLUSIVE = 46;
    const NUM_BALLS = 6;
    const ANIMATION_CYCLE_COUNT = 20;
    const ANIMATION_INTERVAL_MS = 50;
    const BALL_ANIMATION_DELAY_MS = 300;
    const POST_SELECTION_DELAY_MS = 500;
    const GENERATE_BUTTON_DISABLE_MS = 2500;

    const generateBtn = document.getElementById('generateBtn');
    const balls = document.querySelectorAll('.ball');
    
    // Generates a random number between 0 (inclusive) and MAX_NUMBER_EXCLUSIVE (exclusive).
    // The number is padded with a leading zero if it's a single digit.
    function generateNumber() {
        // Generate numbers from 0 to 45 (inclusive)
        const num = Math.floor(Math.random() * MAX_NUMBER_EXCLUSIVE);
        // Convert to string and pad with leading zero if needed
        return num.toString().padStart(2, '0');
    }

    // Animates a single ball to display a randomly selected number.
    // ball: The HTML element representing the ball.
    // number: The final number to be displayed on the ball.
    // delay: The delay in milliseconds before starting the animation for this ball.
    function animateBall(ball, number, delay) {
        // Start animation after the specified delay.
        setTimeout(() => {
            ball.classList.add('animate'); // Add class to trigger visual animation (e.g., shaking).
            
            let counter = 0;
            // This interval rapidly changes the number displayed on the ball to create a spinning effect.
            const interval = setInterval(() => {
                ball.textContent = generateNumber(); // Display a temporary random number.
                counter++;
                
                // After ANIMATION_CYCLE_COUNT cycles, stop the spinning effect.
                if (counter >= ANIMATION_CYCLE_COUNT) {
                    clearInterval(interval); // Stop the number changing interval.
                    ball.textContent = number; // Set the final selected number.
                    ball.classList.add('selected'); // Mark the ball as selected (e.g., change background color).
                    
                    // Remove the animation class after a short delay to ensure the selected state is visible.
                    setTimeout(() => {
                        ball.classList.remove('animate');
                    }, POST_SELECTION_DELAY_MS);
                }
            }, ANIMATION_INTERVAL_MS);
        }, delay);
    }

    // Event listener for the "Generate Numbers" button.
    generateBtn.addEventListener('click', () => {
        // Disable the button to prevent multiple clicks during animation.
        generateBtn.disabled = true;
        
        // Reset the state of each ball (remove selected and animate classes).
        balls.forEach(ball => {
            ball.classList.remove('selected');
            ball.classList.remove('animate');
        });
        
        // Create an array of all possible numbers (e.g., 00, 01, ..., 45).
        const possibleNumbers = Array.from({length: MAX_NUMBER_EXCLUSIVE}, (_, i) => i.toString().padStart(2, '0'));
        const selectedNumbers = [];
        
        // Randomly select NUM_BALLS unique numbers.
        for(let i = 0; i < NUM_BALLS; i++) {
            const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
            selectedNumbers.push(possibleNumbers.splice(randomIndex, 1)[0]); // Add selected number and remove from possible numbers to ensure uniqueness.
        }
        
        // Animate each ball to display one of the selected numbers.
        // A delay is added for each subsequent ball to create a staggered animation effect.
        balls.forEach((ball, index) => {
            animateBall(ball, selectedNumbers[index], index * BALL_ANIMATION_DELAY_MS);
        });
        
        // Re-enable the button after the animations are expected to have completed.
        setTimeout(() => {
            generateBtn.disabled = false;
        }, GENERATE_BUTTON_DISABLE_MS);
    });
});