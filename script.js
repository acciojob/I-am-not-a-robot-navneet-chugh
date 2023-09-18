//your code here
document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.querySelector(".image-container");
    const resetButton = document.getElementById("reset");
    const verifyButton = document.getElementById("verify");
    const para = document.getElementById("para");

    let selectedImages = [];
    let isResetClicked = false;

    // Function to shuffle an array randomly
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to generate a random image grid
    function generateImages() {
        const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
        shuffleArray(imageClasses);

        // Choose one image to repeat
        const repeatImageClass = imageClasses[Math.floor(Math.random() * 5)];

        for (let i = 0; i < 6; i++) {
            const image = document.createElement("img");
            image.classList.add(imageClasses[i]);
            imageContainer.appendChild(image);

            // Add click event listener to images
            image.addEventListener("click", () => {
                if (!isResetClicked && selectedImages.length < 2) {
                    selectedImages.push(image.classList[0]);
                    image.style.pointerEvents = "none";

                    if (selectedImages.length === 2) {
                        verifyButton.style.display = "block";
                    }
                }
            });
        }

        // Check if a button is clicked and reset the state
        resetButton.addEventListener("click", () => {
            selectedImages = [];
            isResetClicked = true;
            verifyButton.style.display = "none";
            para.innerText = "";
            imageContainer.innerHTML = "";
            generateImages();
        });

        // Verify button click event
        verifyButton.addEventListener("click", () => {
            isResetClicked = false;
            verifyButton.style.display = "none";
            if (selectedImages[0] === selectedImages[1]) {
                para.innerText = "You are a human. Congratulations!";
            } else {
                para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
            }
        });
    }

    // Initial image generation
    generateImages();
});
