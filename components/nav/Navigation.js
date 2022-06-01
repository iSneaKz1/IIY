import PropTypes from "prop-types";
import styles from './styles/Styles.module.css'
import {useEffect, useRef, useState} from "react";

export default function Navigation(props) {
    const {redirect, setDark, dark} = props
    const [open, setOpen] = useState(false)
    const ref = useRef()

    const onClick = (event) => {
        const elementos = document.elementsFromPoint(event.clientX, event.clientY)
        if (!elementos.find(e => e === ref.current))
            setOpen(false)
    }
    useEffect(() => {
        if (open) {
            document.body.addEventListener('click', onClick)
        }
        return () => {
            document.body.removeEventListener('click', onClick)
        }
    }, [open])

    return (
        <>
            <nav className={styles.wrapper}>
                <button onClick={() => setOpen(!open)} className={styles.navButton}><span
                    className={'material-icons-round'}>menu</span></button>
            </nav>
            <div ref={ref} className={styles.overlay} style={{display: open ? undefined : 'none'}}>
                <button className={styles.navButton} onClick={() => {
                    setOpen(false)
                    redirect('/profile')
                }}>
                    <span className={'material-icons-round'}>person</span>
                    PERFIL

                </button>

                <button className={styles.navButton} onClick={() => {
                    setOpen(false)
                    redirect('/favoritos')
                }}>
                    <span className={'material-icons-round'}>star</span>
                    FAV

                </button>
                <button className={styles.navButton} onClick={() => {
                    setOpen(false)
                    redirect('/')
                }}>
                    <span className={'material-icons-round'}>money</span>
                    MOEDAS

                </button>
                <button className={styles.navButton} onClick={() => {
                    setOpen(false)
                    redirect('/conversor')
                }}>
                    <span className={'material-icons-round'}>currency_exchange</span>
                    CONVERSOR
                </button>

                <div className={styles.floating}>
                    <button className={styles.navButton} onClick={() => setDark(!dark)}>
                        <span className={'material-icons-round'}>{dark ? 'dark_mode' : 'light_mode'}</span>
                        TEMA
                    </button>
                    <button className={styles.navButton}>
                        <span className={'material-icons-round'}>logout</span>
                        LOGIN/LOGOUT
                    </button>
                </div>
            </div>
        </>
    )
}

Navigation.propTypes = {
    dark: PropTypes.bool,
    setDark: PropTypes.func,
    redirect: PropTypes.func
}