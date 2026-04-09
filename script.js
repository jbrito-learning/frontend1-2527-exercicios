// EXAMPLE 1

// Set Item
localStorage.setItem("name", "John");

// Get Item
let nameString = localStorage.getItem("name");
console.log(nameString);

// Remove Item
localStorage.removeItem("name");

// Clear All Items
localStorage.clear();

// EXAMPLE 2

// Set Item
sessionStorage.setItem("name", "John");

// Get Item
let nameString2 = sessionStorage.getItem("name");
console.log(nameString2);

// Remove Item
sessionStorage.removeItem("name");

// Clear All Items
sessionStorage.clear();

// EXAMPLE 3

let user = {
  name: "John",
  age: 30,
  city: "New York",
};

localStorage.setItem("user", JSON.stringify(user));

let u = JSON.parse(localStorage.getItem("user"));
console.log(u);
