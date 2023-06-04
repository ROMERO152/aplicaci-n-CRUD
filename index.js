// Crear tarea en local storage
function crearTarea(tarea) {
    let tareas = ingresarTarea();
    tareas.push(
        {
            text: tarea,
            completed: false
        }
    );
    //mandar variable al local storage
    localStorage.setItem("tareas",JSON.stringify(tareas));
    
}
//leer

function ingresarTarea() {
    let tareas = localStorage.getItem("tareas");
    if(!tareas){
        return [];
    }
    return JSON.parse(tareas);
}
//actualizar
function actualizarTarea(index, TareaAtualizar) {
    let tareas = ingresarTarea();
    tareas[index] = TareaAtualizar;
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

//borrar

function borrarTarea(index) {
    let tareas = ingresarTarea();
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

//mostrar

function mostrarTareas() {
    let tareas = ingresarTarea();
    let listaTareas = document.getElementById("lisTareas");
    listaTareas.innerHTML = "";

    for (let i = 0; i < tareas.length; i++) {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tareas[i].completed;
        checkbox.addEventListener("change", function () {
            let TareaAtualizar = {text: tareas[i].text, completed: !tareas[i].completed};
            actualizarTarea(i, TareaAtualizar);
            mostrarTareas();
        })
        let span = document.createElement("button");
        span.innerHTML = tareas[i].text;
        let editButton = document.createElement("button");
        editButton.innerHTML = "Editar";
        editButton.addEventListener("click",function () {
            let nuevaTarea = prompt("ingresar nueva tarea:");
            let  TareaAtualizar = { text: nuevaTarea, completed: tareas[i].completed};
            actualizarTarea(i,TareaAtualizar);
            mostrarTareas();
        })
        let botonBorrar = document.createElement("button");
        botonBorrar.innerHTML = "Borrar";
        botonBorrar.addEventListener("click",function (){
            borrarTarea(i);
            mostrarTareas();
        })
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(botonBorrar);
        listaTareas.appendChild(li);
        
    }
}
//agragar tarea a la lista
let form = document.querySelector("form");
form.addEventListener("submit", function (event){
    event.preventDefault();
    let enviarTarea= document.getElementById("tarea")
    let tareavalue = enviarTarea.value;
    crearTarea(tareavalue);
    enviarTarea.value = "";
    mostrarTareas();
})
mostrarTareas();

