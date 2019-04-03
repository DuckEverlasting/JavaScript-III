/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.

* 1. Window/Global Object Binding:
        When it's not otherwise contained (i.e. as part of a method inside an object), "this" is bound to the window/console.

* 2. Implicit Binding:
        When a method is called that uses "this", this refers to the object containing the method.

* 3. New Binding:
        When used as part of a constructor function, "this" refers to the object being created by the function. (Not the constructor function itself.)


* 4. Explicit Binding:
        "This" can be assigned manually by using the "call" or "apply" methods.


* write out a code example of each explanation above
*/

// Principle 1
// code example for Window Binding
console.log(this);

// Principle 2
// code example for Implicit Binding
const haveYouHeard = {
    "word":"bird",
    "speak":function() {
        console.log(`The word is ${this.word}`)
    }
};
haveYouHeard.speak();

// Principle 3
// code example for New Binding
function BuildABear(bearSize) {
    this.size = bearSize;
    this.likesHoney = 'YES';
    this.saySize = function() {console.log(`This bear is ${this.size}`)};
}
const teddy = new BuildABear('small');
const grizzly = new BuildABear('large');


// Principle 4
// code example for Explicit Binding
grizzly.saySize.call(teddy);