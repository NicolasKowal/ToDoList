let container = document.querySelector("#container");
let toDoList = document.querySelector("#toDoList");
let botonAgregar = document.querySelector("#botonAgregar");
let miLista = document.querySelector("#miLista");
let miListaCompletada = document.querySelector("#miListaCompletada");
let listaDeTareas = [];

const RecuperadoJSON = localStorage.getItem("ListaARealizar");
if (RecuperadoJSON) {
	const Recuperado = JSON.parse(RecuperadoJSON);
	Recuperado.forEach((elemento) => {
		listaDeTareas.push(elemento);
	});
}

const GuardarStorage = (array, nombre) => {
	const listaJSON = JSON.stringify(array);
	localStorage.setItem(nombre, listaJSON);
};

function GenerarListaGuardada(array, donde) {
	array.forEach((elemento) => {
		CrearElemento(donde, elemento, listaDeTareas);
	});
}

function CrearElemento(donde, que, array) {
	let tarea = document.createElement("li");
	tarea.innerHTML = `
	<div class="d-flex flex-row align-items-center mb-0 h-100">
		<div class="col-10 d-flex align-items-center">
			<p class="mb-0 w-100 text-start">${que}</p>
		</div>
		<div class="col-2 d-flex align-items-center justify-content-center">
			<button class="text-center" id="btnDelete">✓</button>
		</div>
	</div>
	`;
	donde.appendChild(tarea);
	boton = tarea.querySelector("#btnDelete");
	boton.addEventListener("click", () => {
		miLista.removeChild(tarea);
		let tareaCompletada = document.createElement("li");
		tareaCompletada.innerHTML = `
		<div class="d-flex flex-row align-items-center mb-0 h-100">
			<div class="col-12 d-flex align-items-center">
				<p class="texto mb-0 w-100 text-start">${que}</p>
			</div>
		</div>
		`;
		texto = tareaCompletada.querySelector(".texto");
		miListaCompletada.appendChild(tareaCompletada);
		texto.style.textDecoration = "line-through";
		let index = array.indexOf(que);
		if (index != -1) {
			array.splice(index, 1);
			GuardarStorage(array, "ListaARealizar");
		}
	});
}
GenerarListaGuardada(listaDeTareas, miLista);

botonAgregar.addEventListener("click", () => {
	Swal.fire({
		title: "To Do List",
		input: "text",
		inputPlaceholder: "Ingrese Tarea...",
		showDenyButton: true,
		showCancelButton: true,
		confirmButtonText: "Guardar",
		denyButtonText: `Descartar`,
		cancelButtonText: "Cancelar",
	}).then((result) => {
		if (result.isConfirmed && result.value!="") {
			Swal.fire("Agregado con exito!", "", "success");
			listaDeTareas.push(result.value);
			GuardarStorage(listaDeTareas, "ListaARealizar");
			CrearElemento(miLista, result.value, listaDeTareas);
		} else if (result.isDenied) {
			Swal.fire("Idea descartada", "", "info");
		}
	});
});
