import styles from './Auth.module.css'
import {useMemo, useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie/lib";
import env from '../../env.json'
import PropTypes from "prop-types";

export default function Auth(props) {
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const submit = async () => {

        try {
            const result = await axios({
                url: env.url_server_auth,
                method: 'post',
                data: state,
            })

            const cookies = new Cookies()
            cookies.set('token', result.data)
            props.redirect('/')

        } catch (err) {
            alert('Senha ou email podem estar errados')
            console.error(err)
        }
    }
    const disabled = useMemo(() => {
        return state.email.length === 0 || state.password.length < 8
    }, [state])


    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <div className={styles.field}>
                    <label>Email</label>
                    <input
                        placeholder={'Email'}
                        value={state.email}
                        className={styles.input}
                        onChange={(event) => setState({...state, email: event.target.value})}/>
                </div>
                <div className={styles.field}>
                    <label>Senha</label>
                    <input
                        placeholder={'Senha'}
                        value={state.password}
                        className={styles.input}
                        onKeyDown={event => {
                            if (event.key === "EnterKey" && !disabled)
                                submit().catch()
                        }}
                        onChange={(event) => setState({...state, password: event.target.value})} type={"password"}/>
                    <button className={styles.smallButton} disabled={true}>Esqueci minha senha</button>
                </div>
                <div className={styles.field} style={{marginTop: '16px', gap: '8px'}}>
                    <button
                        onClick={submit}
                        disabled={disabled}
                        style={{width: '100%'}}
                        className={styles.button}>
                        Entrar
                    </button>
                    <button
                        onClick={props.createAccount}
                        style={{width: '100%', background: "transparent", border: 'var(--border-primary) 1px solid'}}
                        className={styles.button}>
                        Não cadastrado ?
                    </button>
                </div>
            </div>
        </div>
    )
}

Auth.propTypes = {
    redirect: PropTypes.func,
    createAccount: PropTypes.func
}
