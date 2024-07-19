document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const buttons = [];
    const gridSize = 6;
    let currentStep = 0;
    let correctPattern = [];
    let showNumbers = false; // Flag to control number display

    // Define patterns for each button
    const patterns = {
        contoh: [12, 7, 14, 19, 26, 27, 22, 16, 10, 5],       // Example pattern 1
        pattern1: [0, 6, 13, 8, 15, 21, 26, 33, 34, 29],        // Example pattern 2: Top row
        pattern2: [30, 25, 19, 14, 21, 27, 24, 28, 22, 17],     // Example pattern 3: Bottom row
        pattern3: [18, 19, 13, 8, 15, 22, 27, 28, 34, 35],          // Example pattern 4: First column
        pattern4: [24, 18, 13, 20, 15, 8, 3, 10, 5]          // Example pattern 5: Last column
    };

    function setPattern(type) {
        correctPattern = patterns[type] || patterns.pattern1;
        showNumbers = (type === 'contoh');
        resetGame();
        // Update active class for pattern buttons
        document.querySelectorAll('.pattern-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`.pattern-button[data-pattern="${type}"]`).classList.add('active');
        updateButtonTexts(); // Update button texts based on selected pattern
    }

    document.querySelectorAll('.pattern-button').forEach(button => {
        button.addEventListener('click', () => {
            const patternType = button.dataset.pattern;
            setPattern(patternType);
        });
    });

    function updateButtonTexts() {
        buttons.forEach(button => {
            if (showNumbers) {
                button.innerText = button.dataset.index; // Show number if pattern is 'contoh'
            } else {
                button.innerText = ''; // Hide number for other patterns
            }
        });
    }

    for (let i = 0; i < gridSize * gridSize; i++) {  // 6x6 grid has 36 buttons
        const button = document.createElement('button');
        button.classList.add('button');
        button.dataset.index = i;
        button.addEventListener('click', handleButtonClick);
        gridContainer.appendChild(button);
        buttons.push(button);
    }

    function handleButtonClick(event) {
        const index = parseInt(event.target.dataset.index, 10);

        if (index === correctPattern[currentStep]) {
            event.target.classList.add('correct');
            currentStep++;
            if (currentStep === correctPattern.length) {
                showModal();
            }
        } else {
            event.target.classList.add('incorrect');
            setTimeout(resetGame, 500);
        }
    }

    function resetGame() {
        buttons.forEach(button => {
            button.classList.remove('correct', 'incorrect');
        });
        currentStep = 0;
    }

    function showModal() {
        $('#congratsModal').modal('show');
        setTimeout(() => {
            const container = document.getElementById('fireworks-container');
            const fireworks = new Fireworks(container, {
                autoresize: true,
                opacity: 0.5,
                acceleration: 1.05,
                friction: 0.95,
                gravity: 1.5,
                particles: 150,
                trace: 3,
                explosion: 5,
                boundaries: {
                    top: 50,
                    bottom: container.clientHeight,
                    left: 50,
                    right: container.clientWidth
                },
                sound: {
                    enable: true,
                    files: [
                        'explosion0.mp3',
                        'explosion1.mp3',
                        'explosion2.mp3'
                    ],
                    volume: { min: 4, max: 8 }
                },
                mouse: {
                    click: true,
                    move: false,
                    max: 1
                }
            });
            fireworks.start();
        }, 500);
    }
});