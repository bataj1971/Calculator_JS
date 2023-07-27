
export class CalculatorEngine {

    constructor() {
        this.result = 0;  /// what is our current result value to calculate with
        this.screenvalue = 0;  /// what is on the screenvalue  ! can not be 'screen' - IE has a built in class
        this.status = ""; /// what are we doing ( +,-,/,*, etc...)
        this.commastatus = ""; /// what are we doing ( +,-,/,*, etc...)
        this.memory = 0;  /// memory value for memory buttons on the calculator
        this.error = "";
        this.maxhandledvalue = 9999999999999;

    }
    processButton(buttonId) {
        switch (buttonId) {

            case "plus":
            case "minus":
            case "multiply":
            case "divide":
                this.process();
                this.status = buttonId;
                this.result = this.screenvalue;
                this.screenvalue = 0;
                break;

            // memory buttons handling     
            case 'memory-in':
                this.memory = this.screenvalue;
                this.screenvalue = 0;
                break;
            case 'memory-out':
                this.screenvalue = this.memory;
                break;
            case 'memory-clear':
                this.memory = 0;
                break;

            // decimal point     
            case "point":
                if (String(this.screenvalue).indexOf('.') < 0) {
                    this.commastatus = buttonId;
                }
                break;

            // equak button    
            case "equal":
                this.process();
                this.status = 'clear';
                break;
            // clear button    
            case "clear":
                this.result = 0;
                this.screenvalue = 0;
                this.error = '';  // reset error status
                break;

            default:
                // number buttons         
                if ("0123456789".indexOf(buttonId) >= 0) {
                    if (this.status == 'clear') {
                        this.screenvalue = 0;
                        this.status = '';
                    }
                    if (this.commastatus == 'point') {
                        this.screenvalue = Number(String(this.screenvalue) + "." + buttonId);
                        this.commastatus = "";
                    } else {
                        this.screenvalue = Number(String(this.screenvalue) + buttonId);
                    }

                }
                break;
        }
        if (Math.abs(this.screenvalue) > this.maxhandledvalue) {
            this.error = 'error-maxval'
        }

        if (this.error !== '') {
            this.screenvalue = this.error;
        }

        return { 'screen': this.screenvalue, 'status': this.status, 'memory': this.memory };
    }

    /**
     * processing values depending on statatus 
     * @returns {undefined}
     */
    process() {

        switch (this.status) {
            case 'plus':
                this.result += this.screenvalue;
                this.screenvalue = this.result;
                break;

            case 'minus':
                this.result -= this.screenvalue;
                this.screenvalue = this.result;
                break;

            case 'multiply':
                this.result *= this.screenvalue;
                this.screenvalue = this.result;
                break;

            case 'divide':

                if (this.screenvalue == 0) {
                    this.error = 'error-zerodiv';  // setting error if divide by zero                        
                } else {
                    this.result = this.result / this.screenvalue;
                    this.screenvalue = this.result;

                }
                break;


            default:
                // do nothing..
                break;
        }

        this.status = ''; // clear status

    }


}