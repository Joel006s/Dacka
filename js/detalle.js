const cargarDato = () => {
	let produ = localStorage.getItem("productoSeleccionado");
	let parrafo = document.createElement("p");
	parrafo.innerHTML = `
						<h2>${produ}</h2>
						<p>$ </p>`
	document.getElementById("productos").appendChild(parrafo)
}