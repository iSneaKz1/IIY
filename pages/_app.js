import '../styles/globals.css'
import styles from '../styles/Wrapper.module.css'
import {useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";
import Navigation from "../components/nav/Navigation";
import axios from "axios";
import env from "../env.json";
function MyApp({Component, pageProps}) {
    const router = useRouter()
    const [dark, setDark] = useState(false)
    const [assets, setAssets] = useState([])
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        axios({
            url: env.url_crypto, method: 'get'
        }).then(result => {
            setAssets(result.data.data)
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

    const isLogin = useMemo(() => {
        return router.pathname === '/auth'
    }, [router.pathname])

    return (
        <div className={[styles.wrapper, dark ? styles.dark : styles.light].join(' ')}>
            {isLogin ? null : <Navigation setDark={setDark} dark={dark} redirect={router.push}/>}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
            />
            <Component {...pageProps} assets={assets} setAssets={setAssets} favorites={favorites} setFavorites={setFavorites}/>
        </div>
    )
}

export default MyApp
