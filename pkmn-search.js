async function getPkmn() {
    const axiosInstance = axios.create({
        baseURL: 'https://pokeapi.co/api/v2/pokemon/'
    });
    
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    const pkmnName = document.getElementById("pokemonName").value.replace(/^0+/,'').toLowerCase();
    try {
        const response = await axiosInstance.get(pkmnName);
        const data = response.data;

        //get Pokemon details
        document.getElementById("name").innerHTML = formatName(data.name);
        document.getElementById("weight").innerHTML = formatWeight(data.weight);
        document.getElementById("types").innerHTML = formatTypes(types);
        document.getElementById("ability").innerHTML = formatAbilities(ability);
        document.getElementById("moves").innerHTML = formatMoves(moves);
        document.getElementById("sprite").src = data.sprites.other.showdown.front_default;
        document.getElementById("sprite").style.display = "block";
        document.getElementById("card").style.display = "block";

        

        function formatName (name) {
            return`${data.name.charAt(0).toUpperCase() + name.slice(1)}`;
        };

        function formatMoves(moves) {
            return `Moves: ${data.moves.slice(0,5).map(move => move.move.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")).join(", ")}`;
        };

        function formatAbilities(ability) {
            return `Abilities: ${data.abilities.map(ability => ability.ability.name.split("-").map(word => word.charAt(0).toUpperCase() +  word.slice(1)).join (" ")).join(", ")}`;
        }

        function formatTypes(types) {
            return `Types: ${data.types.map(type => type.type.name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")).join(", ")}`
        }

        function formatWeight(weight) {
            return `Weight: ${data.weight * 0.22} lbs`
        }
    } catch(error){
        alert("Enter a valid Pokemon");
        console.error("Enter a valid Pokemon", error.message);
    }
}