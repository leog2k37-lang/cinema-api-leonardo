let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

function guardar() {
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
}

function agregarPelicula() {
  const titulo = document.getElementById("titulo").value;
  const genero = document.getElementById("genero").value;
  const anio = document.getElementById("anio").value;
  const imagen = document.getElementById("imagen").value;

  if (!titulo) return alert("El título es obligatorio");

  peliculas.push({
    id: Date.now(),
    titulo,
    genero,
    anio,
    imagen
  });

  guardar();
  mostrarPeliculas();
}

function eliminar(id) {
  peliculas = peliculas.filter(p => p.id !== id);
  guardar();
  mostrarPeliculas();
}

function editar(id) {
  const pelicula = peliculas.find(p => p.id === id);

  document.getElementById("titulo").value = pelicula.titulo;
  document.getElementById("genero").value = pelicula.genero;
  document.getElementById("anio").value = pelicula.anio;
  document.getElementById("imagen").value = pelicula.imagen;

  eliminar(id);
}

function mostrarPeliculas() {
  const contenedor = document.getElementById("peliculas");
  const textoBusqueda = document.getElementById("busqueda").value.toLowerCase();

  contenedor.innerHTML = "";

  peliculas
    .filter(p => p.titulo.toLowerCase().includes(textoBusqueda))
    .forEach(p => {
      contenedor.innerHTML += `
        <div class="card">
          <img src="${p.imagen || 'https://via.placeholder.com/200'}">
          <h3>${p.titulo}</h3>
          <p>${p.genero} - ${p.anio}</p>
          <button onclick="editar(${p.id})">Editar</button>
          <button onclick="eliminar(${p.id})">Eliminar</button>
        </div>
      `;
    });
}

mostrarPeliculas();
