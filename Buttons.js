// Generate input boxes dynamically
function generateInputs(containerId, className, count, startValue, defaultValues) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < count; i++) {
        const label = document.createElement("label");
        label.innerText = (startValue + i) + ": ";
        const input = document.createElement("input");
        input.type = "number";
        input.className = className;
        if (i < defaultValues.length) {
            input.value = defaultValues[i].toString(); // Default value
        } else {
            input.value = "0"; // Default to 0 if there are no more default values
        }
        container.appendChild(label);
        container.appendChild(input);
    }
}

// Attach event handler for Calculate button
document.getElementById("calculateButton").addEventListener("click", function() {
    main();
});

// Attach event handlers for buttons
document.getElementById("setDefaultScores").addEventListener("click", function() {
    const defaultValues = [-30, -25, -15, -10, -7, -4, -3, -1, -1, 0, 1, 2, 3, 5, 7, 10, 14, 19, 25, 32];
    setValues("scoresInput", defaultValues);
});

document.getElementById("setCorrespondingNumbers").addEventListener("click", function() {
    setCorrespondingNumbers("scoresInput");
});

document.getElementById("setRoll4Take3").addEventListener("click", function() {
    const defaultValues = [0, 0, 1, 4, 10, 21, 38, 62, 91, 122, 148, 167, 172, 160, 131, 94, 54, 21, 0, 0];
    setValues("chanceDistribution", defaultValues);
});

document.getElementById("setRollD20").addEventListener("click", function() {
    const boxes = document.getElementsByClassName("chanceDistribution")
    // for (i in boxes) {
    //     i.value = "1"
    // }
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].value = "1"; 
    }
});

// Function to set values in input boxes
function setValues(className, values) {
    const inputBoxes = document.getElementsByClassName(className);
    for (let i = 0; i < inputBoxes.length; i++) {
        if (i < values.length) {
            inputBoxes[i].value = values[i].toString();
        } else {
            inputBoxes[i].value = "0"; // Default to 0 if there are no more default values
        }
    }
}

// Function to set each stat to its corresponding number
function setCorrespondingNumbers(className) {
    const inputBoxes = document.getElementsByClassName(className);
    for (let i = 0; i < inputBoxes.length; i++) {
        inputBoxes[i].value = (i + 1).toString();
    }
}

// Generate input boxes for scores and rolledStats
generateInputs("scoresContainerRow1", "scoresInput", 10, 1, [-30, -25, -15, -10, -7, -4, -3, -1, -1, 0]); // Generate first 10 input boxes
generateInputs("scoresContainerRow2", "scoresInput", 10, 11,  [1, 2, 3, 5, 7, 10, 14, 19, 25, 32]); // Generate next 10 input boxes
generateInputs("chanceDistributionContainerRow1", "chanceDistribution", 10, 1, [0, 0, 1, 4, 10, 21, 38, 62, 91, 122]); // Generate first 10 chance distribution input boxes
generateInputs("chanceDistributionContainerRow2", "chanceDistribution", 10, 11, [148, 167, 172, 160, 131, 94, 54, 21, 0, 0]); // Generate next 10 chance distribution input boxes
generateInputs("rolledStatsContainer", "statsInput", 6, 1, [8, 10, 12, 13, 14, 15]); // Generate rolled stat input boxes with default values