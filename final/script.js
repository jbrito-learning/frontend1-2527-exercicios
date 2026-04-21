const STORAGE_KEY = "tododledoo.todos";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const todoCount = document.querySelector("#todo-count");

let todos = getTodos();
let editingId = null;

const icons = {
  edit: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m12 20 8-8-4-4-8 8-2 6 6-2Z"/><path d="m14 6 4 4"/></svg>',
  trash: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/></svg>',
  save: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
  cancel: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
};

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (!text) {
    notify("warning", "Escreve uma tarefa primeiro.");
    return;
  }

  createTodo(text);
  todoForm.reset();
  todoInput.focus();
});

todoList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const id = button.closest(".todo-item").dataset.id;
  const action = button.dataset.action;

  if (action === "edit") {
    editingId = id;
    renderTodos();
    focusEditInput(id);
  }

  if (action === "save") {
    saveEditedTodo(id);
  }

  if (action === "cancel") {
    editingId = null;
    renderTodos();
  }

  if (action === "delete") {
    confirmDeleteTodo(id);
  }
});

todoList.addEventListener("change", (event) => {
  if (!event.target.matches(".todo-check")) {
    return;
  }

  const id = event.target.closest(".todo-item").dataset.id;
  updateTodo(id, { completed: event.target.checked }, "Estado atualizado.");
});

todoList.addEventListener("keydown", (event) => {
  if (!event.target.matches(".todo-edit-input")) {
    return;
  }

  const id = event.target.closest(".todo-item").dataset.id;

  if (event.key === "Enter") {
    event.preventDefault();
    saveEditedTodo(id);
  }

  if (event.key === "Escape") {
    editingId = null;
    renderTodos();
  }
});

renderTodos();

// GET: ler todas as tarefas guardadas.
function getTodos() {
  const savedTodos = localStorage.getItem(STORAGE_KEY);

  if (!savedTodos) {
    return [];
  }

  try {
    return JSON.parse(savedTodos);
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

// POST: criar uma nova tarefa.
function createTodo(text) {
  const todo = {
    id: createId(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos = [todo, ...todos];
  saveTodos();
  renderTodos();
  notify("success", "Tarefa criada.");
}

// PUT: editar uma tarefa existente.
function updateTodo(id, changes, message = "Tarefa atualizada.") {
  todos = todos.map((todo) => {
    if (todo.id !== id) {
      return todo;
    }

    return { ...todo, ...changes };
  });

  saveTodos();
  renderTodos();
  notify("success", message);
}

// DELETE: apagar uma tarefa.
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);

  if (editingId === id) {
    editingId = null;
  }

  saveTodos();
  renderTodos();
  notify("success", "Tarefa apagada.");
}

async function confirmDeleteTodo(id) {
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return;
  }

  if (!window.Swal) {
    const confirmed = window.confirm(`Apagar "${todo.text}"?`);

    if (confirmed) {
      deleteTodo(id);
    }

    return;
  }

  const result = await Swal.fire({
    title: "Apagar tarefa?",
    text: `Vais apagar "${todo.text}". Esta acao nao pode ser anulada.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d9544d",
    cancelButtonColor: "#68756d",
    confirmButtonText: "Sim, apagar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    deleteTodo(id);
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function saveEditedTodo(id) {
  const item = todoList.querySelector(`[data-id="${id}"]`);
  const input = item.querySelector(".todo-edit-input");
  const newText = input.value.trim();
  const currentTodo = todos.find((todo) => todo.id === id);

  if (!newText) {
    notify("warning", "A tarefa nao pode ficar vazia.");
    input.focus();
    return;
  }

  editingId = null;

  if (currentTodo.text === newText) {
    renderTodos();
    return;
  }

  updateTodo(id, { text: newText });
}

function renderTodos() {
  todoList.innerHTML = "";
  emptyState.hidden = todos.length > 0;
  todoCount.textContent = getCounterText();

  todos.forEach((todo) => {
    todoList.appendChild(createTodoElement(todo));
  });
}

function createTodoElement(todo) {
  const item = document.createElement("li");
  item.className = "todo-item";
  item.dataset.id = todo.id;

  if (todo.completed) {
    item.classList.add("completed");
  }

  const checkbox = document.createElement("input");
  checkbox.className = "todo-check";
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.setAttribute(
    "aria-label",
    todo.completed
      ? `Marcar "${todo.text}" como por concluir`
      : `Marcar "${todo.text}" como concluida`,
  );
  item.appendChild(checkbox);

  const content = document.createElement("div");
  content.className = "todo-content";

  if (editingId === todo.id) {
    content.appendChild(createEditRow(todo));
  } else {
    const text = document.createElement("p");
    text.className = "todo-text";
    text.textContent = todo.text;
    content.appendChild(text);
  }

  const date = document.createElement("time");
  date.className = "todo-date";
  date.dateTime = todo.createdAt;
  date.textContent = `Criada em ${formatDate(todo.createdAt)}`;
  content.appendChild(date);
  item.appendChild(content);

  item.appendChild(createActions(todo));

  return item;
}

function createEditRow(todo) {
  const row = document.createElement("div");
  row.className = "edit-row";

  const input = document.createElement("input");
  input.className = "todo-edit-input";
  input.type = "text";
  input.maxLength = 80;
  input.value = todo.text;
  input.setAttribute("aria-label", "Editar tarefa");
  row.appendChild(input);

  const actions = document.createElement("div");
  actions.className = "todo-actions";
  actions.appendChild(createIconButton("save", "Guardar tarefa", "save"));
  actions.appendChild(createIconButton("cancel", "Cancelar edicao", "cancel"));
  row.appendChild(actions);

  return row;
}

function createActions(todo) {
  const actions = document.createElement("div");
  actions.className = "todo-actions";

  if (editingId === todo.id) {
    return actions;
  }

  actions.appendChild(createIconButton("edit", "Editar tarefa", "edit"));
  actions.appendChild(createIconButton("trash", "Apagar tarefa", "delete", true));

  return actions;
}

function createIconButton(iconName, label, action, isDanger = false) {
  const button = document.createElement("button");
  button.className = isDanger ? "icon-button danger" : "icon-button";
  button.type = "button";
  button.dataset.action = action;
  button.setAttribute("aria-label", label);
  button.title = label;
  button.innerHTML = `${icons[iconName]}<span class="sr-only">${label}</span>`;
  return button;
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
}

function getCounterText() {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  if (total === 0) {
    return "0 tarefas";
  }

  if (total === 1) {
    return `${completed}/1 concluida`;
  }

  return `${completed}/${total} concluidas`;
}

function focusEditInput(id) {
  const input = todoList.querySelector(`[data-id="${id}"] .todo-edit-input`);

  if (input) {
    input.focus();
    input.select();
  }
}

function notify(icon, title) {
  if (!window.Swal) {
    console.info(title);
    return;
  }

  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 1600,
    timerProgressBar: true,
  });
}
