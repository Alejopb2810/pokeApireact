import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrainerGlobal } from '../store/slices/trainer.slice'
import './styles/home.css'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setTrainerGlobal(e.target.name.value.trim()))
        e.target.name.value = ''
        navigate('/pokedex')
    }

    return (
        <div className='home'>
            <img className='home__img1' src="https://i.pinimg.com/originals/bd/cd/20/bdcd20f5411ee5785889542d303ad4cb.png" alt="pokedex" />
            <h1 className='Home__greeting'>¡Hello Trainer!</h1>
            <p className='home__phrase'>🌟Enter your trainer name to start🌠</p>

            <form className='home__form' onSubmit={handleSubmit}>
                <input className='home__input' id='name' type="text" placeholder='Trainer Name' />
                <button className='home__button
                '>Start</button>
            </form>
        </div>


    )
}

export default Home