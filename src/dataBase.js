const sequence = {
    _id: 1,
    get id() { return this._id++}
}

const pokemons = []

function salvarPokemon(pokemon) {
    if (!pokemon.id) pokemon.id = sequence.id
    pokemons[pokemon.id] = pokemon
    return pokemon
}

function mostrarPokemon(id) {
    return pokemons[id] || {}
}

function mostrarPokemons() {
    return Object.values(pokemons)
}

function atualizarPokemon (id, pokemon) {
    pokemons[id] = pokemon
    return pokemon
}

function deletarPokemon(id) {
    sequence._id = sequence._id - 1
    const pokemonDeletado = pokemons[id]
    pokemons.splice(id, 1)
    pokemons.forEach(pokemon => {
        if (pokemon.id > id) {
            pokemon.id = pokemon.id - 1
        }
    })
    return pokemonDeletado
}

function batalhaPokemon(id1, id2) {
    // Criar tipos de danos
    const superEffective = 40
    const effective = 20
    const nonEffective = 10
    // escolher pokemons que irão se enfrentar
    const pokemon1 = pokemons[id1]
    const pokemon2 = pokemons[id2]
    // batalha, com danos de fraquezas e resistências, mas quem tiver a maior velocidade inicia o ataque
    if (pokemon1.velocidade > pokemon2.velocidade) {
        if (pokemon1.hp != 0 && pokemon2.hp != 0) {
            if (pokemon1.tipo == pokemon2.fraqueza) {
                pokemon2.hp = pokemon2.hp - superEffective
            } else if (pokemon1.tipo == pokemon2.resistencia) {
                pokemon2.hp = pokemon2.hp - nonEffective
            } else {
                pokemon2.hp = pokemon2.hp - effective
            }
        }
        if (pokemon2.hp != 0 && pokemon1.hp != 0) {
            if (pokemon2.tipo == pokemon1.fraqueza) {
                pokemon1.hp = pokemon1.hp - superEffective
            } else if (pokemon2.tipo == pokemon1.resistencia) {
                pokemon1.hp = pokemon1.hp - nonEffective
            } else {
                pokemon1.hp = pokemon1.hp - effective
            }
        }
    } else {
        if (pokemon1.hp != 0 && pokemon2.hp != 0) {
            if (pokemon2.tipo == pokemon1.fraqueza) {
                pokemon1.hp = pokemon1.hp - superEffective
            } else if (pokemon2.tipo == pokemon1.resistencia) {
                pokemon1.hp = pokemon1.hp - nonEffective
            } else {
                pokemon1.hp = pokemon1.hp - effective
            }
        }
        if (pokemon2.hp != 0 && pokemon1.hp != 0) {
            if (pokemon1.tipo == pokemon2.fraqueza) {
                pokemon2.hp = pokemon2.hp - superEffective
            } else if (pokemon1.tipo == pokemon2.resistencia) {
                pokemon2.hp = pokemon2.hp - nonEffective
            } else {
                pokemon2.hp = pokemon2.hp - effective
            }
        }
    }

    if (pokemon1.hp < 0) {
        pokemon1.hp = 0
    }

    if (pokemon2.hp < 0) {
        pokemon2.hp = 0
    }

    return `${pokemon1.nome}: ${pokemon1.hp} / ${pokemon2.nome}: ${pokemon2.hp}`
} 

function curarPokemon(id) {
    const cura = 20
    const pokemon = pokemons[id]
    if (pokemon.hp != 100) {
        pokemon.hp = pokemon.hp + cura
        if (pokemon.hp > 100) {
            pokemon.hp = 100
        }
    }
    return `${pokemon.nome}: ${pokemon.hp}`
}



module.exports = { salvarPokemon, mostrarPokemon, mostrarPokemons, atualizarPokemon, deletarPokemon, batalhaPokemon, curarPokemon }