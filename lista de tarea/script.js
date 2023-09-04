const formulario = document.querySelector('.formulario');
const titulo = document.querySelector('#titulo');
const tareas = document.querySelector('#tareas');
let task = [];

formulario.addEventListener('submit', validarFormulario);
tareas.addEventListener('click', eliminarTarea);
tareas.addEventListener('click', completadaTarea);

/*FUNCIONES */
function validarFormulario(e) {
  e.preventDefault();
  
  const tarea = document.querySelector('#tarea').value;
  if (!tarea.trim()) { 
    titulo.textContent ="Formulario vacio";
    
    setTimeout(() =>{
      titulo.textContent ='Formulario';
    }, 2000)
    return;
  }

  //CREAMOS EL OBJETO TAREA
  const objTarea ={
    id: Date.now(),
    tarea: tarea,
    estado: false
  } 

  task = [...task, objTarea];

  formulario.reset();

  mostrarHTML();

}
  
function mostrarHTML() {

  //Limpiar
  while (tareas.firstChild) {
    tareas.removeChild(tareas.firstChild);
  }

  if (task.length > 0) {
    
    task.forEach(item  =>{
  
      const elementos = document.createElement('ul');
      elementos.classList.add('item-tarea');
      elementos.innerHTML = `
      <li>
              <button class="eliminar">
                <i data-id='${item.id}' class="fa-solid fa-trash"></i>
              </button>
              <p>${item.tarea}</p>
              <button class="completado">
                <i data-id='${item.id}' class="fa-regular fa-circle-check"></i>
              </button>
              </li>
      `;
  
      tareas.appendChild(elementos);
  
    })
  }else {
    const mensaje = document.createElement('h5');
    mensaje.textContent = '~SIN TAREAS~';
    tareas.appendChild(mensaje);
  }
  
}

//Eliminar tareas
function eliminarTarea(e) {
  if(e.target.classList.contains('fa-solid')){
  const tareaID = Number(e.target.getAttribute('data-id'));
  
  //eliminar
  const newtask = task.filter((item) => item.id !== tareaID);
  task = newtask;
  mostrarHTML();
}  
}

function completadaTarea(e) {
  if(e.target.classList.contains('fa-regular')){
    const tareaID = Number(e.target.getAttribute('data-id'));
    const newtask = task.map(item =>{
     if(item.id === tareaID){
       item.estado = !item.estado;
       return item;
    } else{
      return item;
    }
    })
    task = newtask;
    mostrarHTML();
  }
}
