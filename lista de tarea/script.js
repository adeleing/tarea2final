const formulario = document.querySelector('.formulario');
const titulo = document.querySelector('#titulo');
const tareas = document.querySelector('#tareas');
const fecha = document.querySelector('#fecha');
const total = document.querySelector('#total');
const completadas = document.querySelector('#completadas');
const pendientes = document.querySelector('#pendientes')
let task = [];

formulario.addEventListener('submit', validarFormulario);
tareas.addEventListener('click', eliminarTarea);
tareas.addEventListener('click', completarTarea);
document.addEventListener('DOMContentLoaded', () => {
  let datosLS = JSON.parse(localStorage.getItem('tareas')) || [];
  task = datosLS;
  mostrarHTML();
})

//Fecha
const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'})

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
  
      const elementos = document.createElement('li');
      elementos.classList.add('item-tarea');
      elementos.innerHTML = `
      
              <button class="eliminar">
                <i data-id='${item.id}' class="fa-solid fa-trash"></i>
              </button>

              <p>${item.estado ? (
                `<span class='completa'>${item.tarea}</span>`
                ) : (
                    `<span>${item.tarea}</span>`
                
              )}</p>
                
              <button class="completado">
                <i data-id='${item.id}' class="fa-regular fa-circle-check"></i>
              </button>
      
              `
  
      tareas.appendChild(elementos);
  
    })
  }else {
    const mensaje = document.createElement('h5');
    mensaje.textContent = '~SIN TAREAS~';
    tareas.appendChild(mensaje);
  }

    //mostrar el total y completadas
    let totalTareas = task.length;
    let tareasPendientes = task.filter(item => item.estado === false).length
    let tareasCompletas = task.filter(item => item.estado ===true).length;

    total.textContent = `Total: ${totalTareas}`;
    pendientes.textContent = `pendientes: ${tareasPendientes}`;
    completadas.textContent = `Completadas: ${tareasCompletas}`;

    localStorage.setItem('tareas', JSON.stringify(task))
  
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


function completarTarea(e) {
  const oficio = document.querySelector('#oficio');
  if(e.target.classList.contains('fa-regular')){
    const tareaID = Number(e.target.getAttribute('data-id'));
    const newtareas = task.map(item =>{
      if (item.id === tareaID){
          item.estado = !item.estado;
          return item;
      }else{
          return item;
      }
  })
  task = newtareas;
       mostrarHTML();
  
}
  
}
