// @ts-ignore
const todos = JSON.parse(localStorage.getItem("todos")) || [];

const render =() =>{
  const todoList = document.getElementById("todo-list");
    // @ts-ignore
    const todosTemplate = todos.map (t =>  "<li>" + t + "</li>");
    // @ts-ignore
    todoList.innerHTML = todosTemplate.join("");
    const elementos = document.querySelectorAll("#todo-list li")
    elementos.forEach((elemento,i)=>{
      elemento.addEventListener("click", ()=>{
        elemento.parentNode?.removeChild(elemento)
        todos.splice(i, 1)
        actualizaTodos(todos)
        render()
      })
    })
}

const actualizaTodos = (todos) => {
  const todoStrings = JSON.stringify(todos)
  localStorage.setItem("todos",todoStrings)
}
window.onload = () => {
  render()
  const form = document.getElementById("todo-form");
  // @ts-ignore
  form.onsubmit = (e) => {
    e.preventDefault();
    const todo = document.getElementById("todo");
    // @ts-ignore
    const todoText = todo.value;
    // @ts-ignore
    todo.value = "";
    todos.push(todoText);
    actualizaTodos(todos)
    // @ts-ignore
    render()
  }
}