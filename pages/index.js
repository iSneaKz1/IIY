import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import env from "../env.json";
import {Card} from "../components/Card";
import saveFavorites from "../utils/saveFavorites";
import {useRouter} from "next/router";

export default function Home(props) {
    const {assets, favorites, setFavorites} = props

    const [selected, setSelected] = useState()
    const [back, setBack] = useState()
    const router = useRouter()
    useEffect(() => {
        if (router.isReady && router.query.id) {
            setSelected(router.query.id)
            setBack(router.query.back)
        }
    }, [router.query])

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
            <div className={styles.headerWrapper}>
                {back ? <button className={styles.button} onClick={() => router.push(back)}><span className="material-icons-round">arrow_back</span>
                </button> : null}
                <h2 className={styles.header}>Em alta</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.cards}>
                    {assets.map(a => (
                        <React.Fragment key={a.id}>
                            <Card
                                label={a.name}
                                symbol={a.symbol}
                                favorites={favorites}
                                setFavorites={setFavorites}
                                id={a.id}
                                selected={selected}
                                setSelected={() => {
                                    router.push({pathname: '/', query: {id: a.id}})
                                    setSelected(a.id)
                                }}
                                addFavorite={() => saveFavorites(favorites, setFavorites)}
                                value={a.metrics.market_data.price_usd}/>
                        </React.Fragment>
                    ))}
                </div>
                <div className={styles.history}>
                    {selectedRef ? <h3>Histórico</h3> : null}
                    <p
                        className={styles.paragraph}
                        dangerouslySetInnerHTML={selectedRef ? {__html: selectedRef.profile.general.overview.project_details} : undefined}
                    />
                </div>
            </div>
        </>
    )
}
