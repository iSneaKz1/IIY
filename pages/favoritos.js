import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import env from "../env.json";
import {Card} from "../components/Card";
import saveFavorites from "../utils/saveFavorites";
import {useRouter} from "next/router";

export default function Favoritos(props) {
    const {assets, favorites, setFavorites} = props
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Início</title>
                <meta name="description" content="Favoritos"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h2 className={styles.header}>Seus favoritos</h2>
            <div className={styles.content}>
                {favorites.map(a => (
                    <React.Fragment key={a.id}>
                        <Card
                            label={a.name}
                            symbol={a.symbol}
                            favorites={favorites}
                            setFavorites={setFavorites}
                            id={a.id}
                            selected={undefined}
                            setSelected={() => router.push({pathname: '/', query: {id: a.id, back: '/favoritos'}})}
                            addFavorite={() => saveFavorites(favorites, setFavorites)}
                            value={a.metrics.market_data.price_usd}/>
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}
