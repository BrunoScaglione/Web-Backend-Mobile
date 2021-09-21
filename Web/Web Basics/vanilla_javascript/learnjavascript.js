
// é o print deles
console.log("Hello World");

var  var1 = 5;
var var2 = 7;
var var5 = 56;
var var6 = 56;


// tem que logar no console pra a ide mostra a resposta das coisas
console.log(var1 + var2)
// nesse caso como a gente nao logou a ide dá erro
document.write("Hello World")

function func1() {
	var3 = 6;
	var4 = 9;
	return var3 * var4
}

console.log(func1());


function func2() {
	console.log("Hi, this is the console, inside the function")
}

func2()

// will get false
console.log(56 == 45);

if(var5 == var6) {
	console.log("the variables are equal to each other");
}
else{
	console.log("the variables are not equal to each other");
}

for(a=1;a<10;a++){
	console.loga(a+"this is the loop")
}

var person = {name: "John", eyecolor: "Black", haircolor: "Brown"}
console.log("person.name")


---------------------------

// Javascript- Full Course for begginers

// hello world:
console.log("Hello World") 

//comments:
var number =5; // in line comment
/* this is a multiline comment 
thjshdiejfn*/

// data types and variables:
/* Data types
undefined, null, boolean, string, symbol, number, and object*/
var nyname = "Bruno"; // used in whole program
myname = 8;
let ourName = "freeCodeCamp"; // only in the scope that you declared that
const pi = 3.14; // can never change (we get error)

// storing values with assigment operator:
var a; // just declare
var b = 2; // declare and assign
a = 7;
b = a;
console.log(a); //see things in the console

// variables are case sensitive:
// names of variables usually beggin lower case, and the name is capitalized:
//Declarations
var studlyCapVar;
var properCamelCase;
var titleCaseOver;
//Assignments
studlyCapVar = 10;
properCamelCase = "A String";
titleCaseOver = 9000;

// adding, subtraction, multiplication, division is usual

//incrementing or decrementing variable:
var myVar = 87;
myVar++;
myVar--;

// % renainder operator

// a += ; -= ; *= ; /= 5 shortcuts

// escape  character: \

// 'the site:"www.google.com"' exemplo de aspas  dentro de string

/* 
CODE OUTPUT
\\  backslah
\n  newline
\r  carriage return
\t  tab
\b  backspace
\f  form feed
*/  

// concatanete strings as usual with +, += shortcut applies also

//strings:

var firstName = "Bruno"
nameLenght = firstname.lenght

firstLetter = firstname[0]

// strings are immutable 

// get last character:
var firstName = "ada"
var lastletter = firstName[firstName.lenght-1]

// arrays:
var ourArray =["john", 23]
ourArray[0] = 2
ourArray.push(["happy", joy]) // adds element to the end of the array
ourArray.unshift(["happy", joy]) // adds element to the beggining of the array
var removedFromOurArray = ourArray.pop() // removes last element 
var removedFromOurArray = ourArray.shift() // removes first element

//functions
function myFunction(a, b) {
  //something
  console.log(a-b)
}

myFunction(10, 5) // call function

/* if we use var: 
variables declared outside function are global, and inside  are local
local variables get undefined in other places
*/

/*if we don´t use var (use nothing like python):
even if its inside a function the variable is global
*/

// if variables have same name, local takes precedent over global

// array to string:
JSON.stringify(array);

//if statement:
function ourTrueorFalse(isitTrue) {
  if (isitTrue) {
    return "Yes, it´s true"
  }
  return "No, that was false"

}

/* strict equality operator:
3 === 3 gives true
3 === "3" gives false
3 == '3' gives true
*/

// inequality operator same as python: !=
// strict inequlity operator: !==
// >=, <=, <, > also the same
// below will return false
if (1==1 && 1==2 || 1==3) {
  return true 
} else if (1==4){
  return true
} else {
  return false
}

//switch statements:
function caseInSwitch(val) {
  var anwer = "";
  switch(val) {
    case 1:
      answer = "alpha";
      break;
    case 2:
      answer = "beta";
      break; 
    case 4:
    case 5:
    case 6:
      answer ="Mid"
      break;
    default:
      answer = "stuff"
      break;
  }
  return answer;  
}

// if a>b , "return a-b" will give true and the contrary also applies

//OBJECTS:
var ourDog = {
  "name": "Camper",
  "legs": 4,
  "tails": 1,
  "friends": ["everything"]
  12: "Falcao"
}
var nameValue = ourDog['name'];
var dogNumber = 12;
var name = ourDog[nameValue];
ourDog["legs"] = 3 // he lost a leg
ourDog["color"] = "brown" // new propertie
delete ourDog["tails"];     // ourDog.tails can also be used because its a single word
//checking if object has a property
var myObj = {
  gift: "pony",
  pet: "kitten",
  bed: "sleigh"
};
function checkObj(checkProp) {
  if (myObj.hasOwnProperty(checkProp)) {
    return myObj[checkProp]
  } else {
    return "Not Found"
  }
}
// array with object, similar to json format that we will talk about later
console.log(checkObj("hello"))   // gives "Not Found"
var myMusic = [ {
  "artist": "Billy Joel",
  "title": "Piano Man",
  "release_year": 1973,
  "formats": ["CD,
  "8T",
  "LP"],
  "gold": true },
   {
     "artist: "Beau Carnes",
     "title": "Cereal Man",
     "release_year": 2003,
     "formats": [
        "Yotube video"
     ]
   }
 ];
//accessing nested Arrays
var LP = myMusic[0].formats[2];
// objects nested inside objects
var myStorage = {
  "car": {
    "inside": {
      "glove box": "maps",
      "passenger seat": "crumbs"
    },
    "outside": {
      "trunk": "jack"
    }
  }
};
// updating a music collection example:
var collection = {
  "2548": {
    "album": "Slippery When Wet"
    "artist": "Bon Jovi",
    "tracks": ["Let It Rcock", "You GIve Love a Bad Name"]
  },
  "2468": {
    "album": "1999",
    "artist": "Prince"
    "tracks": [
      "1999",
      "Little Red Corvette"
    ]
  },
  "1245": {
    "artist": "Robert Palmer",
    "tracks": []
  },
  "5439": {
    "album": "ABBA Gold"
  }
};
//Keep a copy of the collection for tests
var collectCopy = JSON.parse(JSON.stringify(collection));
// Only change code below this line
function updateRecords(id, prop, value) {
  if (value === "") {
    delete collection[id][prop];
  } else if (prop === "tracks") {
    collection[id][prop] = collection[id][prop] || [] // if itself doesnt exist we set equal to empty array
    collection[id][prop].push(value)
  } else {
    collection[id][prop] = value
  }
  return collection;
}
// Alter values below to test code
console.log(updateRecords(2468, "tracks", "test"))

//Iterate while loops:
var myArray = [];
var i = 0;
while(i<5) {
  myArray.push(i)
  i++;
}
console.log(myArray)

//Iterate for loop example
var ourArray = [];
for (var i=0; i<5; i+= 2) {
  ourArray.push(i)
}

// do while loop
// faz o que ta no do pra depois verificar a condição
var myArray = [];
var i = 0;
do {
  myArray.push(i);
  i++;
} while(i<5) 
console.log(myArray);

// random number between 0 and 1:
Math.random();
// random whole number example [0,20]:
Math.floor(Math.random()*20);
// random numbers within range:
function randomRange(myMin, myMax) {
  return Math.floor(Math.random()*(myMax - myMin + 1)) + myMin
};

// strings to integers (base 10 is default):
parseInt("5"); // returns int 5
// parse with binary base (base 2):
parseInt("000101010", 2);

// conditional ternary operator:
// condition? statement-if-true : statement-if-false;
// nested example:
function checkSign(num) {
  return num > 0 ? "positive" : num < 0 ? "negative": "zero"
};

// instead of var, using let:
let catName = "Quincy";
let catName = "Bruno"; // gives error because cannot redeclare

//strict mode, that catches codding mistakes and unsafe actions:
"use strict";

// scope os let is just on the block that is declared, example:
function checkScope() {
  "use strict";
    let i = "function scope";
    if (true) {
      let i = "block scope";
      console.log("Block scope i is:", i);
    }
    console.log("Function scope i is:", i);
    return i;
}
checkScope();  // will give different scopes

// const instead of var and let. Has all features of let but cannot redefine. But can update values trough array update for ex
const s = [5, 7, 2];
s[0] = 2;
// common to use all capital letters:
const PI = 3.14;
// how do we prevent an object form changing in any way? freeze Object:
// example:
function freezeObj() {
  "use strict";
  const MATH_CONSTANTS = {
    PI: 3.14
  };
  Object.freeze()
  try {
    MATH_CONSTANTS.PI = 99;
    // ex === exception
  } catch(ex) {
    console.log(ex);
  }
  return MATH_CONSTANTS.PI;
}
const PI = freezeObj();

//arrow functions to write concise anonymous functions:
var magic =  function() {
  return new Date();
}
// above can be simplified to
var magic = () =>  new Date();
// from normal function to arrow:
// nnormal function:
var myConcat = function(arr1, arr2) {
  return arr1.concat(arr2);
};
console.log(myConcat([1, 2], [3, 4, 5]));
// arrow function:
var myConcat = (arr1, arr2) => arr1.concat(arr2)
console.log(myConcat([1, 2], [3, 4, 5]));
// arrow fuctions are good for map, filter and reduce. They take functions as argument for processing collections of data. Whenever one function takes another function as argument is a good time for arrow functions.
//example:
const realNumberArray = [4,5.6,-9.8,3.14,42,6,8.34,-2]
const squareList = (arr) => {
  const squaredIntegers = arr.filter(num => Number.isInteger(num) && num > 0).map(x => x*x); // filter works with boolean conditions on every elementand map applies a function to every element. => in map is very similar to lambda x: x*x in python.
const squaredIntegers = squaredList(realNumberArray);
console.log(squaredIntegers)
}
// higher order arrow functions:
cost increment = (function() {
  return fuction increment(number, value = 1) { // when we don´t pass nothing value is 1, if we pass something value is something
    return number + value;
  };
}) ();
console.log(increment(5,2));
console.log(increment(5));

// Rest operator(...) with function parameters:
// Rest operator allows you to make a fuction that takes a variable number of arguments:
const sum =(function() {
  return function sum(...args) {
    return args.reduce((a,b) => a + b, 0) // (acumulator, current value) => acumulator + current value, initial value
  };
}) ();

console.log(sum(1,2,3,4));

//spread operator ([...array]): takes an array an spreads it out to its individual parts: basicament prafazer uma copia da array e designar a outra variavel:
const arr1 = ["JAN", "FEB", "MAR", "APR", "MAY"];
let arr2;
(function() {
  arr2 = [...arr1];
  arr1[0] = "potato"
}) ();
console.log(arr2);

//Destruturing Assigment:
var voxel = {x: 3.6, y: 7.4, z: 6.54};
// old way
var x = voxel.x; // x = 3.6
var y = voxel.y; // y = 7.4
var z = voxel.z; // z = 3.6
// new way
const {x: a, y: b, z: c} = voxel; // a = 3.6, b =7.4, c = 6.54

//Destructuring Assignment with Nested Objects
// example:
const LOCAL_FORECAST = {
  today: { min: 72, max: 83},
  tomorrow: {min: 73.3, max: 84.6}
};
function getMaxOfTmrw(forecast) {
  "use strict"
  const { tomorrow: {max: maxOfTomorrow}} = forecast;
  return maxOfTomorrow
}
console.log(getMaxOfTmrw(LOCAL_FORECAST))

//Destructuring Assigment to Assign Variables from arrays:
const [z, x, , y] = [1,2,3,4,5,6] // z ==1, x==2, y ==4

//Destructuring assignment with rest operator:
const source = [1,2,3,4,5,6,7,8,9,10]
function removeFirstTwo(list)  {
  const[, , ...arr] = list;
  return arr;
}
const arr = removeFirstTwo(source);
console.log(arr);
console.log(source);

//Use destructuring assignment to pass an object as a fuction's parameter:
//Example:
// commonly used with API calls
const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.87,
  min: -0.75,
  avarege: 35.85
};
const half = (
fuunction() {
  return function half({max, min}) {
    return (max + min)/2;
  };
})();
console.log(stats);
console.log(half(stats));

// write concise object literal declarations using simple fields
// normal way:
const createPerson = (name, age, gender) => {
  return {
    name: name,
    age: age,
    gender: gender
  };
};
console.log(createPerson("Zodiac Hasbro", 56, "male"));
// better way:
const createPerson = (name, age, gender) => {name, age, gender}
console.log(createPerson("Zodiac Hasbro", 56, "male"));

// write concise declarative functions:
const bicycle = {
  gear: 2,
  setGear: function(newGear) {
    "use strict"
    this.gear = newGear;
  }
};

bicycle.setGear(3);
console.log(bicycle.gear);

//use class syntax to define a constructor function:
// old way
var SpaceShuttle =  function(targetPlanet){
  this.targetPlanet = targetPlanet;
}
var zeus = new SpaceShuttle("Jupiter");
console.log(zeus.targetPlanet)
// class constructor way (similar to python's __init__ and self)
class SpaceShuttlen{
  constructor(targetPlanet){
    this.targetPlanet = targetPlanet;
  }
}
var zeus = new SpaceShuttle("Jupiter");
console.log(zeus.targetPlanet)

//using getters ad setters to control access to an object:
// serve só pra vc nao ter que mexer nas variáveis privadas dietamente
class Book{
  constructor(author) {
    this._author = author;
  }
  //getter
  get writer(){
    return this._author;
  }
  // setter
  set writer(updateAuthor){
    this._author = updatedAuthor;
  }
}
const hisBook = new Book("Joao")
let name = hisBook.writer; // its a propertie, so you dont put parentisis like with functions (although it seems like a function)

// understand the differences between import and require:
// Example:
// in the file "string_function.js" we have:
export const capitalizeString = str => str.toUpperCase()
// we go to our other file "index.js", were we want to import ths function:
import {capitalizeString} from "./string_function" // doesnt need .js
const cap = capitalizeString("hello!");
console.log(cap);

//use export to reuse a code block
// this is the general way to export:
const capitalizeString = (string) => {
  return.charAt(0).toUpperCase() + string.slice(1);
}
export {capitalizeString};
export const foo = "bar";
export const bar = "foo";

// use * to import everything from a file
import * as capitalizeStrings from "file_name";

//create an export fallback with export default
export default subtract(x,y) {return x-y;} // if you only want to export one thing from the file
//and then in this case the import doesnt need to have{}:
import subtract from "math_functions";
subtract(7,4);

