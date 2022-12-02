import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HeroImg from '../images/Hero.png'
import '../styles/homepage.css'

const Homepage = () => {
    const { isLogin } = useSelector(state => state.user)
    return (
        <section id='homepage'>
            <div className='homepage-container'>
                <div className='homepage-desc'>
                    <h1>Butuh Bimbingan? <br /> Yuk Belajar Bersama Kami</h1>
                    <p>Ajarin merupakan platform yang membantu kalian dalam mendapatkan pengajar yang ahli di bidangnya dan kelompok belajar yang saling mendukung</p>
                    <div className='homepage-btn'>
                        <Link to={isLogin ? '/teacher' : '/regis'}>Pelajari Lebih Lanjut</Link>
                        <Link to='/teacher'>Pesan Les Sekarang</Link>
                    </div>
                </div>
                <div className='homepage-img'>
                    <img src={HeroImg} alt="" />
                </div>
            </div>
        </section>
    )
}

export default Homepage