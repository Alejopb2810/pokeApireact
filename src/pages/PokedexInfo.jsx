import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './styles/pokedexInfo.css'

const PokedexInfo = () => {

    const { id } = useParams()

    const [pokemon, setPokemon] = useState()

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
        axios.get(URL)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))
    }, [id])

    console.log(pokemon)

    return (
        <div className='pokeInfo'>
            <nav className='pokeInfo__nav'>
                <img className='pokeInfo__img' src="https://poketouch.files.wordpress.com/2020/06/cropped-two_pikachu_pokemon_logo.png" alt="pokenav" />
            </nav>
            <article className={`pokeInfo-content border-${pokemon?.types[0].type.name}`} >
                <header className={`pokeInfo__header bg-${pokemon?.types[0].type.name}`}>
                    <img className='pokeInfo__sprite' src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon" />
                </header>

                <section className='pokeInfo__body'>
                    <h3 className={`pokeInfo__name color-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
                    <h3 className='pokeInfo__id'>#{pokemon?.id}</h3>
                    <ul className='pokeInfo__properties'>
                        {
                            pokemon?.types.map(type => (
                                <li className='pokeInfo__types' key={type.type.url}>{type.type.name}</li>
                            ))
                        }
                    </ul>
                    <ul className='pokeInfo__features'>
                        {
                            pokemon?.stats.map(stat => (
                                <li className='pokeInfo__stat' key={stat.stat.url}>
                                    <span className='pokeInfo__label'>{stat.stat.name}</span>
                                    <span className={`pokeInfo__number color-${pokemon?.types[0].type.name}`}>{stat.base_stat}</span>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </article>
            <footer className='pokeInfo__footer'>
                <h3 className='pokeInfo__title'> Movements </h3>
                <ul className='pokeInfo__movement'>
                    {
                        pokemon?.moves.map(move => (
                            <li className='pokeInfo__move' key={move.move.name}>{move.move.name}</li>
                        ))
                    }
                </ul>
            </footer>
        </div>
    )
}

export default PokedexInfo