const formulario = document.getElementById("formPoke");
const btnSom = document.getElementById("btnSom");
let somPokemon = null;

formulario.addEventListener("submit", async function(evento) {

    evento.preventDefault();

    const id = document.getElementById("idPoke").value;

    const msg = document.getElementById("msg");

    try {

        msg.textContent = "Carregando Pokémon...";

        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado!");
        }

        const pokemon = await resposta.json();

        // Mostrar resultado
        document.getElementById("resultado").style.display = "block";

        // 1 - Nome
        document.getElementById("nomePokemon").textContent =
            pokemon.name.toUpperCase();

        // 2 - Imagem
        document.getElementById("imgPoke").src =
            pokemon.sprites.front_default;

        // 3 - Experiência
        document.getElementById("basePoke").textContent =
            pokemon.base_experience;

        // 4 - Altura
        document.getElementById("alturaPoke").textContent =
            pokemon.height / 10 + " m";

        // 5 - Peso
        document.getElementById("pesoPoke").textContent =
            pokemon.weight / 10 + " kg";

        // Tipo
        document.getElementById("tipoPoke").textContent =
            pokemon.types.map(item => item.type.name).join(", ");

        msg.textContent = "";

        // Carregar som do Pokémon
        const respostaEspecie = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const especie = await respostaEspecie.json();

        const somUrl = especie.cries.latest;

        if (somUrl) {
            somPokemon = new Audio(somUrl);
            btnSom.style.display = "block";
        } else {
            somPokemon = null;
            btnSom.style.display = "none";
        }

    } catch (erro) {

        msg.textContent = "Pokémon não encontrado!";
        document.getElementById("resultado").style.display = "none";
        btnSom.style.display = "none";
        somPokemon = null;

    }

});

btnSom.addEventListener("click", function() {
    if (somPokemon) {
        somPokemon.play();
    }
});
