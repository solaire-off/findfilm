import React from 'react';
import FilmList from './components/FilmList';
import Header from './components/Header'
import Hero from './components/Hero';
import Search from './components/Search';
import Button from './components/Button';
import Footer from './components/Footer';

import './App.sass'

import FilmListData from './assets/json/film-list.json'

const App = () => {
    const siteName = ['netflix', 'roulette']
    return (
        <>
            <Header title={siteName}>
                <Button
                    onClick={() => { console.log("Add Mobie") }}
                    type="button"
                    buttonStyle="btn--outline-primary" >
                    + Add Movie
                </Button>
            </Header>
            <Hero title="FIND YOUR MOVIE">
                <Search />
            </Hero>
            <div class="main">
                <div className="container">
                    <FilmList list={FilmListData} />
                </div>
            </div>
            <Footer title={siteName} />
        </>
    )
}

export default App
