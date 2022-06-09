import {withSessionSsr} from "../lib/session/withSession";
import LoginForm from "../components/admin/LoginForm";
import Head from "next/head";


export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req, res }) {
        const user = req.session.user;
        console.log(user);
        console.log(typeof user);
        if (typeof user === "undefined") {
            return {
                props: {}
            }
        }
        return({
            redirect: {
                destination: '/account/overview',
                permanent: false
            }
        })
    }
)

export default function login( ) {


    return (
        <>
            <Head>
                <title>Login</title>
            </Head>

                <LoginForm/>
        </>
    )
}