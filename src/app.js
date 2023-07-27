import './style.scss';

import { CalculatorFace } from './calculator/CalculatorFace';
import { CalculatorEngine } from './calculator/CalculatorEngine';

const calculatorEngine = new CalculatorEngine();
new CalculatorFace(calculatorEngine);
console.log('app.js works');