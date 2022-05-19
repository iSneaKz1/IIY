import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import env from "../env.json";

export default function Home() {
    const [assets, setAssets] = useState([])
    const [favorites, setFavorites] = useState([])
    const [selected, setSelected] = useState()
    useEffect(() => {
        axios({
            url: env.url_crypto, method: 'get'
        }).then(result => {
            setAssets(result.data.data)
            setSelected(result.data.data[0].id)
        }).catch()
    }, [])
    useEffect(() => {
        if (assets.length > 0) {
            let read = localStorage.getItem('favorites')
            const result = []
            if (read) {
                read = JSON.parse(read)
                read.forEach(r => {
                    result.push(assets.find(a => a.id === r))
                })
            }
            setFavorites(result)
        }
    }, [assets])

    const getCard = (a) => (
        <Card
            label={a.name}
            symbol={a.symbol}
            favorites={favorites}
            setFavorites={setFavorites}
            id={a.id}
            selected={selected}
            setSelected={() => setSelected(a.id)}
            addFavorite={() => {
                if (!favorites.find(f => f.id === a.id)) {
                    const newArr = [...favorites, a]
                    setFavorites(newArr)
                    localStorage.setItem('favorites', JSON.stringify(newArr.map(n => n.id)))
                } else {
                    const newArr = favorites.filter(f => f.id !== a.id)
                    setFavorites(newArr)
                    localStorage.setItem('favorites', JSON.stringify(newArr.map(n => n.id)))
                }
            }}
            value={a.metrics.market_data.price_usd}/>
    )

    const selectedRef = useMemo(() => {
        return assets.find(a => a.id === selected)
    }, [selected])
    return (
        <>
            <Head>
                <title>Início</title>
                <meta name="description" content="Início"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h2 className={styles.header}>Em alta</h2>
            <div className={styles.content}>
                <div className={styles.cardsWrapper}>
                    <div className={styles.cards}>
                        {assets.map(a => (
                            <React.Fragment key={a.id}>
                                {getCard(a)}
                            </React.Fragment>
                        ))}
                    </div>

                    {selectedRef ? <h3>Histórico</h3> : null}
                    <p
                        className={styles.paragraph}
                        dangerouslySetInnerHTML={selectedRef ? {__html: selectedRef.profile.general.overview.project_details} : undefined}
                    />
                </div>
                <div className={styles.favorites}>
                    <h4>Seus favoritos</h4>
                    {favorites.length > 0 ? null : 'Nada encontrado'}
                    {favorites.map(f => (
                        <React.Fragment key={f.id}>
                            {getCard(f)}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}

export function Card({label, value, symbol, id, favorites, addFavorite, selected, setSelected}) {
    return (
        <div className={styles.card} data-selected={`${selected === id}`} onClick={setSelected}>
            <label>{label} ({symbol})</label>
            <div title={`$${value.toFixed(2)}`} className={styles.value}>${value.toFixed(2)}</div>
            <button
                className={styles.buttonFavorite}
                onClick={() => addFavorite()}
                style={{color: favorites.find(f => f.id === id) ? '#ff5555' : undefined}}
                title={'Favoritar'}
            >
                <span className={'material-icons-round'}>favorite</span>
            </button>
        </div>
    )
}