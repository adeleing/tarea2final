const inputTarea = document.getElementById('tarea');
const btn = document.getElementById('agregar');
const list = document.getElementById('list');
const cantidad = document.getElementById('cantidad');
const cantidadRea = document.getElementById('cantidad-rea');

let total = 0;
let r = 0;
let p = 0;

btn.onclick = function () {
    const elemento = inputTarea.value;
    const li = document.createElement('li');
    li.textContent = elemento;
    list.appendChild(li);
    
    total++;
  cantidad.innerHTML = total;

    li.setAttribute('tarea');

    li.innerHTML = 
    `<button class="btn-delete">
    <i id="delete" class="fa-solid fa-trash"></i>
  </button>
  <p>${texto}</p>
  <button id="btn-check">
    <i id="check" class="fa-regular fa-circle-check"></i>
  </button>
  `

}


