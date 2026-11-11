//menu
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const navLinksContainer = document.getElementById('nav-links-container');

if (menuToggleBtn && navLinksContainer) {
  menuToggleBtn.addEventListener('click', function () {
    navLinksContainer.classList.toggle('abierto');

    const expandido = navLinksContainer.classList.contains('abierto');
    menuToggleBtn.setAttribute('aria-expanded', expandido);
  });
}



//catalogo
document.addEventListener('DOMContentLoaded', function () {

  const linkCatalogo = document.getElementById('link-catalogo');
  const seccionCatalogo = document.getElementById('catalogo-section');

  if (linkCatalogo && seccionCatalogo) {
    linkCatalogo.addEventListener('click', function (e) {
      e.preventDefault();
      seccionCatalogo.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const filtros = document.querySelectorAll('.filtro-btn');
  filtros.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filtros.forEach(function (b) { b.classList.remove('activo'); });
      btn.classList.add('activo');
    });
  });

});




document.addEventListener("DOMContentLoaded", () => {
    // Array de datos
    const itemsCatalogo = [
        // --- LIBROS ---
        { titulo: "Ficciones", autor: "Jorge Luis Borges", categoria: "libros", badge: "Libro", badgeClass: "badge-libro", bg: "bg-verde-oscuro", rating: "4.9" },
        { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", categoria: "libros", badge: "Libro", badgeClass: "badge-libro", bg: "bg-rojo-oscuro", rating: "5.0" },
        { titulo: "El nombre del viento", autor: "Patrick Rothfuss", categoria: "libros", badge: "Libro", badgeClass: "badge-libro", bg: "bg-azul-oscuro", rating: "4.8" },
        // --- REVISTAS ---
        { titulo: "National Geographic", autor: "Junio 2025", categoria: "revistas", badge: "Revista", badgeClass: "badge-revista", bg: "bg-amarillo-oscuro", rating: "4.7" },
        { titulo: "Scientific American", autor: "Mayo 2025", categoria: "revistas", badge: "Revista", badgeClass: "badge-revista", bg: "bg-cian-oscuro", rating: "4.6" },
        { titulo: "Muy Interesante", autor: "Junio 2025", categoria: "revistas", badge: "Revista", badgeClass: "badge-revista", bg: "bg-purpura-oscuro", rating: "4.5" },
        // --- AUDIOLIBROS ---
        { titulo: "Sapiens", autor: "Yuval Noah Harari", categoria: "audiolibros", badge: "Audiolibro", badgeClass: "badge-audio", bg: "bg-bosque-oscuro", rating: "4.8" },
        { titulo: "Dune", autor: "Frank Herbert", categoria: "audiolibros", badge: "Audiolibro", badgeClass: "badge-audio", bg: "bg-marino-oscuro", rating: "4.9" },
        { titulo: "El principito", autor: "Antoine de Saint-Exupéry", categoria: "audiolibros", badge: "Audiolibro", badgeClass: "badge-audio", bg: "bg-terracota-oscuro", rating: "5.0" }
    ];

    const contenedor = document.getElementById("catalogo-contenido");
    const botonesFiltro = document.querySelectorAll(".filtro-btn");

    function renderizar(filtro = "todos") {
        contenedor.innerHTML = ""; 


        const categorias = ["libros", "revistas", "audiolibros"];

        categorias.forEach(cat => {
  
            if (filtro !== "todos" && filtro !== cat) return;

            const filtrados = itemsCatalogo.filter(item => item.categoria === cat);

            const grupoDiv = document.createElement("div");
            grupoDiv.className = "col-12 mb-5 catalogo-grupo";

            const tituloGrupo = document.createElement("h3");
            tituloGrupo.className = "categoria-subtitulo mb-4";
            tituloGrupo.textContent = cat.toUpperCase();
            grupoDiv.appendChild(tituloGrupo);

    
            const filaDiv = document.createElement("div");
            filaDiv.className = "row g-4";

            filtrados.forEach(item => {
                const colDiv = document.createElement("div");
                colDiv.className = "col-12 col-md-4";

                colDiv.innerHTML = `
                    <div class="card-coleccion">
                        <div class="card-preview ${item.bg}">
                            <span class="preview-titulo">${item.titulo}</span>
                        </div>
                        <div class="card-info">
                            <h4 class="item-titulo">${item.titulo}</h4>
                            <p class="item-autor">${item.autor}</p>
                            <div class="card-footer-info">
                                <span class="badge-tipo ${item.badgeClass}">${item.badge}</span>
                                <span class="item-rating">★ ${item.rating}</span>
                            </div>
                        </div>
                    </div>
                `;
                filaDiv.appendChild(colDiv);
            });

            grupoDiv.appendChild(filaDiv);
            contenedor.appendChild(grupoDiv);
        });
    }

    renderizar("todos");
});

//autores  

const autores = [
    { iniciales: "JLB", nombre: "Jorge Luis Borges", obras: "32 obras" },
    { iniciales: "GGM", nombre: "Gabriel García Márquez", obras: "18 obras" },
    { iniciales: "MV", nombre: "Mario Vargas Llosa", obras: "24 obras" },
    { iniciales: "IA", nombre: "Isabel Allende", obras: "20 obras" }
];

const contenedorAutores = document.getElementById("autores-contenido");

function renderizarAutores() {
    contenedorAutores.innerHTML = "";

    autores.forEach(autor => {
        const colDiv = document.createElement("div");
        colDiv.className = "col-12 col-md-6 col-lg-3";

        colDiv.innerHTML = `
            <div class="card-autor">
                <div class="autor-avatar-box">
                    <span class="autor-iniciales">${autor.iniciales}</span>
                </div>
                <div class="autor-info">
                    <h4 class="autor-nombre">${autor.nombre}</h4>
                    <p class="autor-obras">${autor.obras}</p>
                </div>
            </div>
        `;
        contenedorAutores.appendChild(colDiv);
    });
}

renderizarAutores();