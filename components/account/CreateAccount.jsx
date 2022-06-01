
import styles from './Account.module.css'
import {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie/lib";
import env from '../../env.json'
import PropTypes from "prop-types";

export default function CreateAccount(props) {
    const [state, setState] = useState({
        email: '', password: '', confirmPassword: ''
    })
    const submit = async () => {
        try {
            const result = await axios({
                url: env.url_server_create, method: 'post', data: state,
            })

            const cookies = new Cookies()
            cookies.set('token', result.data)
            props.redirect('/')

        } catch (err) {
            alert('Senha ou email podem estar errados')
            console.error(err)
        }
    }

    return (<div className={styles.wrapper}>
            <div className={styles.form}>
                <div className={styles.field}>
                    <label>Nome</label>
                    <input
                        placeholder={'Senha'}
                        value={state.name}
                        className={styles.input}
                        onChange={(event) => setState({...state, name: event.target.value})}/>
                </div>
                <div className={styles.field}>
                    <label>Email</label>
                    <input
                        placeholder={'Email'}
                        className={styles.input}
                        value={state.email}
                        onChange={(event) => setState({...state, email: event.target.value})}/>
                </div>
                <div className={styles.field}>
                    <label>Senha</label>
                    <input
                        placeholder={'Senha'}
                        value={state.password}
                        className={styles.input}
                        onChange={(event) => setState({...state, password: event.target.value})} type={"password"}/>
                </div>
                <div className={styles.field}>
                    <label>Confirmar senha</label>
                    <input
                        placeholder={'Senha'}
                        className={styles.input}
                        value={state.confirmPassword}
                        onChange={(event) => setState({...state, confirmPassword: event.target.value})}
                        type={"password"}/>

                </div>
                <div className={styles.field} style={{marginTop: '16px', display: 'flex'}}>
                    <button
                        onClick={submit}
                        disabled={state.email.length === 0 || state.password.length < 8 || state.password !== state.confirmPassword}
                        className={styles.button}>
                        Cadastrar
                    </button>
                    <button
                        onClick={props.return}
                        style={{background: '#ff5555'}}
                        className={styles.button}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>)
}

CreateAccount.propTypes = {
    redirect: PropTypes.func,
    return: PropTypes.func
}
