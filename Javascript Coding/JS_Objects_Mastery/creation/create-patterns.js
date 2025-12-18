/**
 * JS Objects Mastery: Creation Patterns
 *
 * 1. Object literal
 * 2. Factory Function
 * 3. Constructor Function
 * 4. Object.create
 * 5. Class (ES6)
 */

// 1. Object Literal
// Quickest, standard for singletons or data carriers.
const literalObj = {
    name: 'Literal',
    greet() { return `Hello from ${this.name}`; }
};

// 2. Factory Function
// Returns a new object. Good for encapsulation (closure).
function createRobot(name) {
    return {
        name,
        type: 'Robot',
        speak() { return `I am ${this.name}`; }
    };
}

// 3. Constructor Function
// Classic 'class'-like inheritance. Uses 'this' and 'new'.
function Animal(species) {
    this.species = species;
}
// Methods added to prototype to share memory
Animal.prototype.describe = function () {
    return `A generic ${this.species}`;
};

// 4. Object.create
// Pure prototypal inheritance. Creates a new object with specific proto.
const proto = {
    isHuman: false,
    print() { return `Human: ${this.isHuman}`; }
};
const objCreateInstance = Object.create(proto);
objCreateInstance.name = 'Creation';

// 5. Class Syntax (Sugar)
class Vehicle {
    constructor(type) {
        this.type = type;
    }
    drive() { return `Driving a ${this.type}`; }
}

// --- TEST SUITE ---
if (require.main === module) {
    console.log('--- Object Creation Patterns ---');

    console.log('1. Literal:', literalObj.greet());

    const robo = createRobot('Bender');
    console.log('2. Factory:', robo.speak());

    const dog = new Animal('Dog');
    console.log('3. Constructor:', dog.describe());
    console.log('   Instanceof Animal?', dog instanceof Animal); // true

    console.log('4. Object.create:', objCreateInstance.print());
    console.log('   Inherited prop?', objCreateInstance.isHuman); // false

    const car = new Vehicle('Car');
    console.log('5. Class:', car.drive());
}
