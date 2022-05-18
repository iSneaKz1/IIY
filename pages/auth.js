import Head from 'next/head'
import {useState} from "react";
import {useRouter} from "next/router";
import Auth from "../components/auth/Auth";
import CreateAccount from "../components/account/CreateAccount";

const TABS = {
    LOGIN: 0,
    CREATE: 1
}
export default function AuthPage() {
    const router = useRouter()
    const [on, setOn] = useState(TABS.LOGIN)
    return (
        <>
            <Head>
                <title>Entrar</title>
                <meta name="description" content="Página de autenticação"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {on === TABS.LOGIN ?
                <Auth redirect={router.push} createAccount={() => setOn(TABS.CREATE)}/>
                :
                <CreateAccount redirect={router.push} return={() => setOn(TABS.LOGIN)}/>
            }
        </>
    )
}
