import React from 'react';
import FilmList from './components/FilmList';
import Header from './components/Header'
import Hero from './components/Hero';
import Search from './components/Search';
import Button from './components/Button';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Dropdown from './components/Dropdown';
import Tabs from './components/Tabs';

import './App.sass'

import FilmListData from './assets/json/film-list.json'

const App = () => {
    const siteName = ['netflix', 'roulette']
    const tabsItems = [
        {
            name: 'All',
            isActive: true
        },
        {
            name: 'Documentary',
            isActive: false
        },
        {
            name: 'Comedy',
            isActive: false
        },
        {
            name: 'Horror',
            isActive: false
        },
        {
            name: 'Crime',
            isActive: false
        },
    ]
    const sortTypes = [
        {
            name: 'release date',
            value: 'release_date'
        },
        {
            name: 'movie title',
            value: 'title'
        }
    ]
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
                    <ErrorBoundary>
                        <div class="settings">
                            <Tabs list={tabsItems} />
                            <Dropdown
                                label="Sort by"
                                options={sortTypes}
                            />
                        </div>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <FilmList list={FilmListData} />
                    </ErrorBoundary>
                </div>
            </div>
            <Footer title={siteName} />
        </>
    )
}

export default App
