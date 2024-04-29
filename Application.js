let min = 1;
let max = 100;
let randomNum;
let score = 5;
let lastUserNum;

document.addEventListener("DOMContentLoaded", function() {
    const minInput = document.getElementById("minInput");
    const maxInput = document.getElementById("maxInput");
    const setRangeButton = document.getElementById("setRange");
    const errorText = document.getElementById("error");
    const userInput = document.getElementById("user");
    const checkButton = document.getElementById("check");
    const exitButton = document.getElementById("exit");
    const resultText = document.getElementById("result");
    const minSpan = document.getElementById("min");
    const maxSpan = document.getElementById("max");

    //Кнопка диапазона
    setRangeButton.addEventListener("click", function() {
        const newMin = parseInt(minNum.value);
        const newMax = parseInt(maxNum.value);

        if (!isNaN(newMin) && !isNaN(newMax) && newMin >= 0 && newMax > newMin) {
            min = newMin;
            max = newMax;
            randomNum = generateRandomNumber(min, max);
            minSpan.textContent = min;
            maxSpan.textContent = max;
            errorText.textContent = "";
            resultText.textContent = "";
            score = 5;
            lastUserNum = null;
        }
        else {
            errorText.textContent = "Вы ввели неверный диапазон. Введите ещё раз."
        }
    });

    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //Кнопка "Проверить"
    checkButton.addEventListener("click", function() {
        const userNum = parseInt(userInput.value);
        console.log(lastUserNum, randomNum);

        if (!isNaN(userNum)) {
            if (userNum == randomNum) {
                resultText.textContent = "Поздравляем! Вы угадали загаданное число."
            }
            else {
                const help = getHelp(user);
                resultText.textContent = help;
                lastUserNum = userNum;
                score--;

            }
            if (score === 0 ||score < 0) {
                resultText.textContent = `Игра окончена! Загаданное число было ${randomNum}`;
            }
        }
        else {
            resultText.textContent = "Введите корректное число";
        }
    });

    function getHelp(userNum) {
        if (lastUserNum == null) {
            return score === 5 ? "Первая попытка" : "Не угадал. Попробуё ещё раз."
        }
        
        const prevDiff = Math.abs(randomNum - lastUserNum);
        const currentDiff = Math.abs(randomNum - userNum);
        
        if (currentDiff < prevDiff) {
        
            return `Теплее! Осталось ${score} попыток.`;
        }
        else if (currentDiff > prevDiff) {
            return `Холоднее! Осталось ${score} попыток.`;
        }
        else {
            return `Не угадал, но ты также близок. Осталось ${score} попыток.`;
        }
    }

    //Кнопка "Выйти"
    exitButton.addEventListener("click", function() {
        resultText.textContent = `Игра окончена! Загаданное число было ${randomNum}`;
    });
});