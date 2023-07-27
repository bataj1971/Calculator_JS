export class CalculatorFace {

    constructor(calculatorEngine) {
        this.calculatorEngine = calculatorEngine;
        this.buttonContainer = document.getElementById('buttons');
        this.screenTextElement = document.getElementById('screentext');
        this.memoryElement = document.getElementById('memory');


        this.buttonElements = {};

        this.renderCalculatorFace();
        this.setCalculatorButtonEvents();
        this.setCalculatorKeyEvents();
    }

    renderCalculatorFace() {

        const buttons = this.getButtonDefinitions();
        

        console.log("buttons", buttons);
        buttons.map((e) => {

            const buttonClasses = ['button', ...e[2].split(' ')];
            const buttonKeyCode = e[3];
            const buttonElement = document.createElement('div');
            buttonElement.setAttribute('id', e[0]);

            buttonElement.classList.add(...buttonClasses);

            buttonElement.innerHTML = e[1];

            this.buttonContainer.append(buttonElement);
            this.buttonElements[buttonKeyCode] = buttonElement;
        });

    }
    setCalculatorButtonEvents() {

        this.buttonContainer.addEventListener('click', this.handleButtonClick.bind(this));        

    }


    handleButtonClick(event) { 
        console.log('handleButtonClick', event.target);
        const buttonId = event.target.id ?? '';
        console.log('handleButtonClick buttonizd:', buttonId);        
        
        const status = this.calculatorEngine.processButton(buttonId);
        this.setScreen(status);
    }

    setScreen(status) {
        const screenText = String(status['screen'] ?? '').substring(0, 13);
        this.screenTextElement.textContent = '';
        console.log("screenText:", screenText, screenText.split(''));
        screenText.split('').map((digit) => {
            console.log("adding digit:", digit);
            const digitElement = document.createElement('div');
            digitElement.innerHTML = digit;
            this.screenTextElement.append(digitElement);
         });
        // this.screenTextElement.innerHTML = screenText ;
        this.memoryElement.innerHTML = (status['memory'] == 0 ? "" : "M");

        // if (status['status'] !== "" && status['status'] !== "clear") {
        //     $("#buttons #" + status['status']).addClass('pushed');
        // } else {
        //     $("#buttons .button").removeClass('pushed');
        // }

    }

    setCalculatorKeyEvents() {
        document.addEventListener('keypress', this.handleKeyPress.bind(this));
    }

    handleKeyPress(event) {
        console.log("handleKeyPress", event.key, event.which);
        if (event.which in this.buttonElements) {
            this.buttonElements[event.which].click();
        }

    }


    getButtonDefinitions() {
        const buttonDefinitions = [
            ['clear', 'C', 'sign red', 99],
            ['memory-in', 'M+', 'sign blue', 109],
            ['memory-clear', 'MC', 'sign blue', 100],
            ['memory-out', 'MR', 'sign blue', 114],

            ['1', '1', 'number', 49],
            ['2', '2', 'number', 50],
            ['3', '3', 'number', 51],
            ['multiply', '&times;', 'sign', 42],

            ['4', '4', 'number', 52],
            ['5', '5', 'number', 53],
            ['6', '6', 'number', 54],
            ['divide', '&divide;', 'sign', 47],

            ['7', '7', 'number', 55],
            ['8', '8', 'number', 56],
            ['9', '9', 'number', 57],
            ['minus', '-', 'sign', 45],

            ['point', '.', 'sign', 44],
            ['0', '0', 'number', 48],
            ['equal', '=', 'sign', 13],
            ['plus', '+', 'sign', 43]
        ];
        return buttonDefinitions;
    }
}