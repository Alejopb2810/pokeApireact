import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import PokeCard from '../components/Pokedex/PokeCard'
import './styles/pokedex.css'

const Pokedex = () => {

    const { trainer } = useSelector(state => state)

    const [pokemons, setPokemons] = useState()
    const [types, setTypes] = useState()
    const [typeSelect, setTypeSelect] = useState('All pokemons')

    const navigate = useNavigate()

    useEffect(() => {
        if (typeSelect !== 'All pokemons') {
            // hacer la peticion de los pokemons por tipo
            axios.get(typeSelect)
                .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
                .catch(err => console.log(err))
        } else {
            //hacer la peticion de todos los pokemons
            const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=3000'
            axios.get(URL)
                .then(res => setPokemons(res.data.results))
                .catch(err => console.log(err))
        }
    }, [typeSelect])

    useEffect(() => {
        const URL = 'https://pokeapi.co/api/v2/type'
        axios.get(URL)
            .then(res => setTypes(res.data.results))
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const input = e.target.search.value.trim().toLowerCase()
        navigate(`/pokedex/${input}`)
    }

    const handleChange = e => {
        setTypeSelect(e.target.value)
        setPage(1)
    }

    //logica de paginacion
    const [page, setPage] = useState(1)
    const [pokePerPage, setPokePerPage] = useState(8)
    const initialPoke = (page - 1) * pokePerPage
    const finalPoke = page * pokePerPage
    const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage)

    return (
        <div className='pokedex'>
            <nav className='pokedex__nav'>
                <img className='pokedex__img' src="https://poketouch.files.wordpress.com/2020/06/cropped-two_pikachu_pokemon_logo.png" alt="pokenav" />
            </nav>
            <h2 className='pokedex__phrase'><span>Welcome {trainer}</span>, here you can find your favorite pokemon.</h2>
            <form className='pokedex__form' onSubmit={handleSubmit}>
                <input className='pokedex__input' id='search' type="text" placeholder='Pokemon name' />
                <button className='pokedex__button'>Search</button>

                <select className='pokedex__change' onChange={handleChange}>
                    <option value='All pokemons'>All pokemons</option>
                    {
                        types?.map(type => (
                            <option key={type.url} value={type.url}>{type.name}</option>
                        ))
                    }
                </select>
            </form>
            <Pagination
                page={page}
                maxPage={maxPage}
                setPage={setPage}
            />
            <div className='poke-container'>
                {
                    pokemons?.slice(initialPoke, finalPoke).map(poke => (
                        <PokeCard
                            key={poke.url}
                            url={poke.url}
                        />
                    ))
                }
            </div>
            <Pagination
                page={page}
                maxPage={maxPage}
                setPage={setPage}
            />
        </div>
    )
}

export default Pokedex