// Exemplo 1

class MyElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <h1>Hello World</h1>
        `;
  }
}

customElements.define("my-element", MyElement);

// Exemplo 2

class MyElement2 extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
        <p>Shadowed Text</p>
        `;
    const p = shadow.querySelector("p");
    p.style.color = "red";
    p.addEventListener("click", () => {
      p.style.color = "green";
    });
  }
}

customElements.define("my-element2", MyElement2);

// Exemplo 3

class UserCard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const template = document
      .getElementById("user-card-template")
      .content.cloneNode(true);
    shadow.appendChild(template);
  }
}

customElements.define("user-card", UserCard);

// Exemplo 4

class MyNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <header class="navbar">
                <div class="logo">Fake Store</div>
                <nav>
                    <ul>
                        <li><a href="#hero">Home</a></li>
                        <li><a href="#products">Produtos</a></li>
                        <li><a href="#">Contato</a></li>
                    </ul>
                </nav>
            </header>
        `;
  }
}

customElements.define("my-navbar", MyNavbar);
