window.onload = function(){
    // Переменные для хранения чисел и операций
    let a = ''           // Первое число
    let b = ''           // Второе число
    let expressionResult = ''  // Результат вычисления
    let selectedOperation = null  // Выбранная операция

    // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result")

    // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a)
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        }
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }

    // Настраиваем обработчики для цифровых кнопок
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Настраиваем обработчики для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    }

    // Вычисляем результат при нажатии на =
    document.getElementById("btn_op_equal").onclick = function() {
        if (a === '' || b === '' || !selectedOperation)
            return

        switch(selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                if (+b === 0) {
                    outputElement.innerHTML = "Ошибка";
                    return;
                }
                expressionResult = (+a) / (+b)
                break;
            default:
                break;
        }

        a = expressionResult.toString()
        b = ''
        selectedOperation = null
        outputElement.innerHTML = a
        outputElement.style.fontSize = '2.2rem';
        outputElement.style.lineHeight = '85px';
        outputElement.style.whiteSpace = 'nowrap';
    }

    // Кнопка очистки
    document.getElementById("btn_op_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = null
        expressionResult = ''
        outputElement.innerHTML = '0'
        outputElement.style.fontSize = '2.2rem';
        outputElement.style.lineHeight = '85px';
        outputElement.style.whiteSpace = 'nowrap';
    }

    // Кнопка смены знака
    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) {
            if (a !== '' && a !== '0') {
                if (a.startsWith('-')) {
                    a = a.substring(1);
                } else {
                    a = '-' + a;
                }
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '' && b !== '0') {
                if (b.startsWith('-')) {
                    b = b.substring(1);
                } else {
                    b = '-' + b;
                }
                outputElement.innerHTML = b;
            }
        }
    }

    // Кнопка процента
    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (+a / 100).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (+b / 100).toString();
                outputElement.innerHTML = b;
            }
        }
    }

    document.getElementById("btn_op_stddev").onclick = function() {
        if (a === '' || a === '0') {
            outputElement.innerHTML = "Введите числа (1,2,3,4,5)";
            return;
        }
        let numbers;
        if (a.includes(',')) {
            numbers = a.split(',').map(Number);
        } else if (a.includes(' ')) {
            numbers = a.split(' ').map(Number);
        } else {
            numbers = a.toString().split('').filter(char => char >= '0' && char <= '9').map(Number);
        }
        numbers = numbers.filter(n => !isNaN(n));
        if (numbers.length < 2) {
            outputElement.innerHTML = "Нужно минимум 2 числа";
            return;
        }
        // Вычисляем среднее (μ)
        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        let mean = sum / numbers.length;
        // Вычисляем стандартное отклонение (σ)
        let sumSquaredDiff = 0;
        for (let i = 0; i < numbers.length; i++) {
            sumSquaredDiff += Math.pow(numbers[i] - mean, 2);
        }
        let variance = sumSquaredDiff / numbers.length;
        let stdDev = Math.sqrt(variance);
        let result = `НОРМАЛЬНОЕ РАСПРЕДЕЛЕНИЕ\n`;
        result += `Среднее (μ) = ${mean.toFixed(4)}\n`;
        result += `Отклонение (σ) = ${stdDev.toFixed(4)}\n`;
        result += `68% данных: ${(mean - stdDev).toFixed(2)} … ${(mean + stdDev).toFixed(2)}\n`;
        result += `95% данных: ${(mean - 2*stdDev).toFixed(2)} … ${(mean + 2*stdDev).toFixed(2)}`;
        outputElement.style.fontSize = '14px';
        outputElement.style.lineHeight = '1.4';
        outputElement.style.whiteSpace = 'pre-wrap';
        outputElement.innerHTML = result;
    };
};
