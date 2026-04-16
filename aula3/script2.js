// Exemplo 1

let dataArray = ["english", "portuguese", "spanish", "french", "german"];
localStorage.setItem("languages", JSON.stringify(dataArray));

let arrayObject = JSON.parse(localStorage.getItem("languages"));
console.log(arrayObject[0]);

// Exemplo 2

let user = {
  name: "John",
  grades: [10, 9, 8, 7, 6],
  info: {
    age: 20,
    city: "New York",
  },
};

localStorage.setItem("user", JSON.stringify(user));

let userObject = JSON.parse(localStorage.getItem("user"));
console.log(userObject.grades[0]);

// Exemplo 3

window.addEventListener("storage", (event) => {
  console.log("Chave alterada: " + event.key);
  console.log("Novo valor: " + event.newValue);
  console.log("Valor anterior: " + event.oldValue);
});

// Exemplo 4
let password = "batatas";
let encryptedPassword = btoa(password);
console.log(encryptedPassword);
let decryptedPassword = atob(encryptedPassword);
console.log(decryptedPassword);

// Exemplo 5
let secretKey = "babatasfritascomarroz";
let encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
console.log(encrypted);
let decrypted = CryptoJS.AES.decrypt(encrypted, secretKey).toString(
  CryptoJS.enc.Utf8,
);
console.log(decrypted);
