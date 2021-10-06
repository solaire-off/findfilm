import React, { useState } from 'react';
import FilmList from './components/FilmList';
import Header from './components/Header'
import Hero from './components/Hero';
import Search from './components/Search';
import Button from './components/Button';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Dropdown from './components/Dropdown';
import Tabs from './components/Tabs';
import { FilmModalEdit } from './components/FilmModalEdit';

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

    const [isOpenAddModal, toggleAddModal] = useState(false)
    const openAddModal = () => {
        toggleAddModal(true)
    }
    const closeAddModal = () => {
        toggleAddModal(false)
    }

    return (
        <>
            <Header title={siteName}>
                <Button
                    onClick={openAddModal}
                    type="button"
                    buttonStyle="btn--outline-primary" >
                    + Add Movie
                </Button>
            </Header>
            <Hero title="FIND YOUR MOVIE">
                <Search />
            </Hero>
            <div className="main">
                <div className="container">
                    <ErrorBoundary>
                        <div className="settings">
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

            <FilmModalEdit
                isDisplay={isOpenAddModal}
                closeCallback={closeAddModal}
                modalTitle="Add movie" />
        </>
    )
}

export default App
