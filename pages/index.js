import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import env from "../env.json";

export default function Home() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios({
            url: env.url_crypto + 'btc/metrics/market-data', method: 'get'
        }).then(result => {
            console.log(result.data)
        }).catch()
    }, [])
    return (
        <>
            <Head>
                <title>Início</title>
                <meta name="description" content="Início"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
        </>
    )
}
