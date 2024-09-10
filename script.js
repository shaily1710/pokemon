document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    const apiUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }
        const pokemonData = await response.json();

        // Populate the top container
        document.getElementById('pokemon-name').textContent = pokemonData.name.toUpperCase();
        document.getElementById('pokemon-id').textContent = `#${pokemonData.id}`;
        document.getElementById('weight').textContent = `Weight: ${pokemonData.weight}`;
        document.getElementById('height').textContent = `Height: ${pokemonData.height}`;

        // Set the Pokémon sprite image
        const spriteContainer = document.getElementById('sprite-container');
        spriteContainer.innerHTML = ''; // Clear previous sprite
        const img = document.createElement('img');
        img.id = 'sprite';
        img.src = pokemonData.sprites.front_default;
        img.alt = `${pokemonData.name} front default sprite`;
        spriteContainer.appendChild(img);

        // Populate types
        const typesContainer = document.getElementById('types');
        typesContainer.innerHTML = ''; // Clear previous types
        pokemonData.types.forEach(typeInfo => {
            const typeSpan = document.createElement('span');
            typeSpan.className = `type ${typeInfo.type.name}`;
            typeSpan.textContent = typeInfo.type.name.toUpperCase();
            typesContainer.appendChild(typeSpan);
        });

        // Populate the stats table
        document.getElementById('hp').textContent = pokemonData.stats[0].base_stat;
        document.getElementById('attack').textContent = pokemonData.stats[1].base_stat;
        document.getElementById('defense').textContent = pokemonData.stats[2].base_stat;
        document.getElementById('special-attack').textContent = pokemonData.stats[3].base_stat;
        document.getElementById('special-defense').textContent = pokemonData.stats[4].base_stat;
        document.getElementById('speed').textContent = pokemonData.stats[5].base_stat;

    } catch (error) {
        alert(error.message);
    }
});
