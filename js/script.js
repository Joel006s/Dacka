// ARRAYS
const mainArray = [
  {
    title: "DACKA",
    elemento1: "Inicio",
    elemento2: "Productos",
    elemento3: "Acerca de",
    elemento4: "Contacto",
  },
];
const cart = [
  { subtitle: "card numero uno", name: "buzo", price: "25,000", class: "fnd1" },
  { subtitle: "card numero dos", name: "buzo", price: "20,000", class: "fnd2" },
  { subtitle: "card numero tres", name: "remera", price: "15,000", class: "fnd3" },
  { subtitle: "card numero cuatro", name: "Zapatilla", price: "27,000", class: "fnd4" },
  { subtitle: "card numero cinco", name: "remera", price: "18,000", class: "fnd5" },
  { subtitle: "card numero seis", name: "short", price: "18,000", class: "fnd6" },
];
// HERO
const mainMenu = () => {
  let image = document.createElement("div");
  image.innerHTML = `<img src="img/dacka-logo2.png" alt="${mainArray[0].title}" width="130px" style="margin: 10px;">`;
  document.getElementById("header").appendChild(image);

  // Botón menú hamburguesa (solo se muestra en móviles)
  let btnMenu = document.createElement("button");
  btnMenu.className = "menu-hamburguesa";
  btnMenu.id = "btnMenu";
  btnMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
  document.getElementById("header").appendChild(btnMenu);

  let head = document.createElement("nav");
  head.innerHTML = `
        <a href="#" class="navBar">${mainArray[0].elemento1}</a>
        <a href="#" class="navBar">${mainArray[0].elemento2}</a>
        <a href="#twitter" class="navBar">${mainArray[0].elemento3}</a>
        <a href="#" class="navBar">${mainArray[0].elemento4}</a>
        <div class="barra" style="position: relative; top: 0;">
            <section> <i class="fa-solid fa-magnifying-glass"></i> </section>
            <input type="search" placeholder="¿Qué necesita buscar?">
        </div>
    `;
  document.getElementById("header").appendChild(head);

  // Lógica para mostrar/ocultar menú hamburguesa en móviles
  setTimeout(() => {
    const btnMenu = document.getElementById("btnMenu");
    const nav = document.querySelector("nav");
    if (btnMenu && nav) {
      btnMenu.addEventListener("click", function() {
        nav.classList.toggle("abierto");
      });
    }
  }, 100);

  let busqueda = document.createElement("div");
  busqueda.style.position = "relative"
  busqueda.style.top = "100px"

  busqueda.innerHTML = `
        <h1 style="position: relative; top: -100px;">
            <span id="titulo1">Conocé más sobre</span>
            <span id="titulo2">productos aquí</span> 
            <center><a href="#subtitulo"><i class="fa-solid fa-angle-down" id="flecha"></i></a></center>
        </h1>
    `;
  document.getElementById("header").appendChild(busqueda);

  let carrito = document.createElement("section");
  carrito.innerHTML = `
        <i class="fa-solid fa-cart-shopping" style="cursor: pointer;"><i id="acum">0</i></i>`;
  document.getElementById("header").appendChild(carrito);
};
mainMenu();

// CARTAS DE LO MÁS VENDIDO
const cards = () => {
  let subtitle = document.createElement("div");
  subtitle.innerHTML = `
        <h2 id="subtitulo"><em>¡Lo más vendido!</em></h2>
        <hr>
    `;
  document.getElementById("subtitulo").appendChild(subtitle);
  for (let producto of cart) {
    let card = document.createElement("section");
    card.innerHTML = `
            <div class="card ${producto.class}">
                <h2 id="name"><span>${producto.name.toUpperCase()}</span></h2>
                <h2 id="price">$ <span>${producto.price}</span></h2>
                <button class="ver-mas-btn">Ver más</button>
            </div>
        `;
    const btn = card.querySelector('.ver-mas-btn');
    btn.addEventListener('click', function() {
      desplegable(producto);
    });
    document.getElementById("cards").appendChild(card);
  }
};
cards();

// DEPLEGABLE
const desplegable = (producto) => {
  // Limpiar el contenido anterior
  document.getElementById("desplegable").innerHTML = "";

  // Crear el contenedor
  let contenedor = document.createElement("div");
  contenedor.className = "detalle-producto";

  // ... código existente ...
  let cerrar = document.createElement("button");
  cerrar.textContent = "✖";
  cerrar.className = "cerrar-modal";
  cerrar.addEventListener('click', () => {
    contenedor.classList.remove("visible");
    setTimeout(() => {
      document.getElementById("desplegable").innerHTML = "";
    }, 350);
  });
  // ... código existente ...
  contenedor.appendChild(cerrar);
  // ... código existente ...

  // Crear los elementos de detalle
  let nombre = document.createElement("h2");
  nombre.textContent = `Producto: ${producto.name}`;

  // Condición para mostrar talles diferentes si es Zapatilla
  let talle;
  if (producto.name.toLowerCase() === "zapatilla") {
    talle = document.createElement("h3");
    talle.innerHTML = `Talle: 
      <div class="talle-selector">
        <div class="talle-option" data-talle="38" id="talle1">38</div>
        <div class="talle-option" data-talle="39" id="talle2">39</div>
        <div class="talle-option" data-talle="40" id="talle3">40</div>
        <div class="talle-option" data-talle="41" id="talle4">41</div>
        <div class="talle-option" data-talle="42" id="talle5">42</div>
      </div>`;
  } else {
    talle = document.createElement("h3");
    talle.innerHTML = `Talle: 
      <div class="talle-selector">
        <div class="talle-option" data-talle="XS" id="talle1">XS</div>
        <div class="talle-option" data-talle="S" id="talle2">S</div>
        <div class="talle-option" data-talle="M" id="talle3">M</div>
        <div class="talle-option" data-talle="L" id="talle4">L</div>
        <div class="talle-option" data-talle="XL" id="talle5">XL</div>
      </div>`;
  }
  let precio = document.createElement("h2");
  precio.textContent = `$${producto.price}`;
  let description = document.createElement("p");
  description.textContent = producto.subtitle || `Buzo de tela fina`;
  let boton = document.createElement("button");
  boton.className = "boton-agregar";
  boton.textContent = "Agregar al carrito";
  boton.addEventListener('click', () => {
    // Buscar talle seleccionado
    const talleSeleccionado = contenedor.querySelector('.talle-option.selected');
    if (!talleSeleccionado) {
      alert('Por favor selecciona un talle.');
      return;
    }
    agregar(producto, talleSeleccionado.dataset.talle);
    // Cerrar modal
    contenedor.classList.remove("visible");
    setTimeout(() => {
      document.getElementById("desplegable").innerHTML = "";
    }, 350);
  });

  // Agregar los elementos al contenedor
  contenedor.appendChild(nombre);
  contenedor.appendChild(talle);
  contenedor.appendChild(precio);
  contenedor.appendChild(description);
  contenedor.appendChild(boton);
  contenedor.classList.remove("visible");

  // Agregar el contenedor al desplegable
  document.getElementById("desplegable").appendChild(contenedor);
  // Espera un momento para que el navegador registre el elemento y luego añade la clase
  setTimeout(() => {
    contenedor.classList.add("visible");
  }, 10);

  // Agregar evento para selección de talle
  contenedor.addEventListener('click', function(e) {
    if (e.target.classList.contains('talle-option')) {
      // Remover selección previa
      const prevSelected = this.querySelector('.talle-option.selected');
      if (prevSelected) {
        prevSelected.classList.remove('selected');
      }
      // Agregar nueva selección
      e.target.classList.add('selected');
    }
  });
};

// ACERCA DE

const acercaDe = () => {
  let acerca = document.createElement("div");
  acerca.innerHTML = `
  <h2>Acerca de <span id="acercaDe"><em>Dacka</em></span></h2>
  `;
  document.getElementById("acercaDe").appendChild(acerca);
  let links = document.createElement("div");
  links.innerHTML = `
  <a href="#" class="link" id="instagram"><i class="fa-brands fa-instagram"></i>Instagram</a>
  <a href="#" class="link" id="facebook"><i class="fa-brands fa-facebook"></i>Facebook</a>
  <a href="#" class="link" id="twitter"><i class="fa-brands fa-twitter"></i>Twitter</a>
  `;
  links.style.display = "flex";
  links.style.gap = "10px"; 
  links.className = "links";  
  document.getElementById("acercaDe").appendChild(links);
};
acercaDe();






// FLECHA
/* let arrow = document.getElementById("flecha");

const irAProductos = () => {
  window.location.href = "#subtitulo"; // Cambia "#productos" por la URL o el id de la sección que desees
};

if (arrow) {
  arrow.addEventListener("click", irAProductos);
} */

// AGREGAR AL CARRITO
let acum = 0;
const agregar = (producto, talle) => {
  acum++;
  document.getElementById("acum").innerHTML = acum;
  document.getElementById("acum").style.display = "inline";
  // Obtener carrito actual
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  // Agregar producto con talle
  carrito.push({
    name: producto.name,
    price: producto.price,
    talle: talle
  });
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

// MENÚ DESPLEGABLE DE COMPRA
const mostrarCarrito = () => {
  // Limpiar el contenido anterior
  document.getElementById("desplegable").innerHTML = "";

  // Crear el contenedor
  let contenedor = document.createElement("div");
  contenedor.className = "detalle-producto";

  // Botón cerrar
  let cerrar = document.createElement("button");
  cerrar.textContent = "✖";
  cerrar.className = "cerrar-modal";
  cerrar.addEventListener('click', () => {
    contenedor.classList.remove("visible");
    setTimeout(() => {
      document.getElementById("desplegable").innerHTML = "";
    }, 350);
  });
  contenedor.appendChild(cerrar);

  // Título
  let titulo = document.createElement("h2");
  titulo.textContent = "Carrito de Compras";
  contenedor.appendChild(titulo);

  // Obtener productos del carrito
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    let vacio = document.createElement("p");
    vacio.textContent = "No hay productos agregados.";
    contenedor.appendChild(vacio);
  } else {
    // Crear tabla
    let tabla = document.createElement("table");
    tabla.style.width = "100%";
    tabla.innerHTML = `<tr><th>Producto</th><th>Precio</th><th>Talle</th><th>Eliminar</th></tr>`;
    let total = 0;
    carrito.forEach((item, idx) => {
      let fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>${item.talle}</td>
        <td><button class="eliminar-item" data-idx="${idx}" style="border: none;">🗑️</button></td>
      `;
      tabla.appendChild(fila);
      // Sumar al total (eliminar puntos y comas para parsear)
      total += parseInt(item.price.replace(/\D/g, ''));
    });
    contenedor.appendChild(tabla);
    // Total
    let totalDiv = document.createElement("div");
    totalDiv.style.marginTop = "10px";
    totalDiv.innerHTML = `<strong>Total: $${total.toLocaleString()}</strong>`;
    contenedor.appendChild(totalDiv);
    // Botón finalizar compra
    let finalizar = document.createElement("button");
    finalizar.textContent = "Finalizar compra";
    finalizar.className = "boton-agregar";
    finalizar.style.marginTop = "15px";
    finalizar.addEventListener('click', () => {
      // Ocultar contenido actual y mostrar formulario de tarjeta
      contenedor.innerHTML = '';
      let form = document.createElement('form');
      form.className = 'form-tarjeta';
      form.innerHTML = `
        <h2>Datos de la tarjeta</h2>
        <label>Nombre en la tarjeta:<br><input type="text" name="nombre" required></label><br>
        <label>Número de tarjeta:<br><input type="text" name="numero" maxlength="19" pattern="[0-9 ]{16,19}" required></label><br>
        <label>Vencimiento:<br><input type="text" name="vencimiento" placeholder="MM/AA" maxlength="5" required></label><br>
        <label>CVV:<br><input type="password" name="cvv" maxlength="4" pattern="[0-9]{3,4}" required></label><br>
        <button type="submit" class="boton-agregar" style="margin-top:15px;">Confirmar compra</button>
      `;
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por tu compra!');
        localStorage.removeItem('carrito');
        document.getElementById("acum").innerHTML = 0;
        acum = 0;
        contenedor.classList.remove("visible");
        setTimeout(() => {
          document.getElementById("desplegable").innerHTML = "";
        }, 350);
      });
      contenedor.appendChild(form);
      // Botón para cerrar el formulario
      let cerrarForm = document.createElement('button');
      cerrarForm.textContent = '✖';
      cerrarForm.className = 'cerrar-modal';
      cerrarForm.type = 'button';
      cerrarForm.addEventListener('click', () => {
        contenedor.classList.remove('visible');
        setTimeout(() => {
          document.getElementById('desplegable').innerHTML = '';
        }, 350);
      });
      contenedor.appendChild(cerrarForm);
      setTimeout(() => {
        contenedor.classList.add('visible');
      }, 10);
    });
    contenedor.appendChild(finalizar);
    // Eliminar producto
    contenedor.addEventListener('click', function(e) {
      if (e.target.classList.contains('eliminar-item')) {
        const idx = e.target.dataset.idx;
        carrito.splice(idx, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        document.getElementById("acum").innerHTML = carrito.length;
        acum = carrito.length;
        mostrarCarrito();
      }
    });
  }

  // Mostrar el contenedor
  document.getElementById("desplegable").appendChild(contenedor);
  setTimeout(() => {
    contenedor.classList.add("visible");
  }, 10);
};

// Evento para el icono del carrito
setTimeout(() => {
  const iconoCarrito = document.querySelector('.fa-cart-shopping');
  if (iconoCarrito) {
    iconoCarrito.addEventListener('click', mostrarCarrito);
  }
}, 100);
