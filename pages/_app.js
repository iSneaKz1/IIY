import '../styles/globals.css'
import styles from '../styles/Wrapper.module.css'
function MyApp({Component, pageProps}) {
    return (
        <div className={styles.wrapper}>
            <nav className={styles.nav}></nav>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
            />
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
