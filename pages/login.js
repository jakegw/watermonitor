import Head from "next/head";
import LoginForm from "../components/admin/LoginForm";
import {withSessionSsr} from "../lib/session/withSession";


export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req, res}) {
      const user = req.session.user;
      if (typeof user === "undefined") {
        return {
          props: {},
        };
      }
      return ({
        redirect: {
          destination: "/admin/",
          permanent: false,
        },
      });
    },
);

export default function login() {


  return (
      <>
        <Head>
          <title>Login</title>
        </Head>

        <LoginForm />
      </>
  );
}