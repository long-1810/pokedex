const pokemonName = document.getElementById("name-pokemon");
const pokemonHeight = document.getElementById("height-pokemon");
const pokemonWeight = document.getElementById("weight-pokemon");
const pokemonAbilities = document.getElementById("abilities-pokemon");
const pokemonSprites = document.getElementById("sprites-pokemon");

let data = {}
let pokemon = "1"

async function fetchData() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await res.json()
    return data
}

function displayAbilities(abilitiesArray) {
    let name, isHidden, slot

    abilitiesArray.forEach((elem) => {
        name = elem.ability.name.toUpperCase()
        isHidden = elem.is_hidden
        slot = elem.slot
        const abilityCard = 
    `<div class="card-ability">
        <p class="name-ability">Name: ${name}</p>
        <p class="hidden-ability">Hidden: ${isHidden}</p>
        <p class="slot-ability">Slot: ${slot}</p>
    </div>`
        pokemonAbilities.innerHTML += abilityCard
    })
    console.log(abilitiesArray)
}

function displaySprites(spritesArray) {
    Object.keys(spritesArray).forEach((key) => {
        if (key != "other" && key != "versions") {
            const url = spritesArray[key]
            const image = `<div class="sprite"><p class="title">${key.toUpperCase()}</p><img src="${url}" alt="${key}"></div>`
            url && (pokemonSprites.innerHTML += image)
        }
    })
    console.log(spritesArray)
}

async function main() {
    data = await fetchData()
    console.log(data)
    pokemonName.innerText = data.name.toUpperCase()
    pokemonHeight.innerText = `Height: ${data.height} meters`
    pokemonWeight.innerText = `Weight: ${data.weight} kilogrammes`
    displayAbilities(data.abilities)
    displaySprites(data.sprites)
}

main()
