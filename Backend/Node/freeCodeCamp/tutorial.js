// lets see how to export modules to use in other files
const sum = (num1, num2) => num1 + num2;
const PI = 3.14;
class someMathObject {
    constructor() {
        console.log('object created');
    }
}
// no node nao usa o default export
module.exports.sum = sum;
module.exports.pi = PI;
module.exports.somemathobject = someMathObject;
// or we cand do:
module.exports = { sum: sum, PI: PI, someMathObject: someMathObject }

////////////////////////////////////////////////////////////