const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");

function obtenerColor(tipo) {
    const colores = {
        fire: "#f87171",
        water: "#60a5fa",
        grass: "#4ade80",
        electric: "#facc15",
        normal: "#a8a29e"
    };
    return colores[tipo] || "#888";
}

async function obtenerPokemon() {

    contenedor.innerHTML = "<p id='cargando'>Cargando Pokémon...</p>";

    // Carga los primeros 20
    for (let i = 1; i <= 20; i++) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = await res.json();
            crearCard(data);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    // Carga Pikachu adicional
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
        const data = await res.json();
        crearCard(data);
    } catch (error) {
        console.log("Error Pikachu:", error);
    }

    const cargando = document.getElementById("cargando");
    if (cargando) cargando.remove();
}

function crearCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("card");

    const nombre = pokemon.name.toUpperCase();
    const imagen = pokemon.sprites.front_default;
    const tipo = pokemon.types[0].type.name;

    const color = obtenerColor(tipo);
    card.style.border = `2px solid ${color}`;

    card.innerHTML = `
        <img src="${imagen}">
        <h3>${nombre}</h3>
        <p class="tipo">${tipo}</p>
    `;

    contenedor.appendChild(card);
}

buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const nombre = card.querySelector("h3").textContent.toLowerCase();

        if (nombre.includes(texto)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

obtenerPokemon();