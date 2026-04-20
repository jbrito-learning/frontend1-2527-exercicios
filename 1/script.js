// Example 1

let jsonString = '{"name": "John", "age": 30, "city": "New York"}';
let obj = JSON.parse(jsonString);
console.log(obj);

// Example 2

let obj2 = {
  name: "John",
  age: 30,
  city: "New York",
};
let jsonString2 = JSON.stringify(obj2);
console.log(jsonString2);

// Example 3

let data = fetch("data.json")
  .then((response) => response.json())
  .then((data) => console.log(data));
