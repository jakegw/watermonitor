import {Center, Stack, Text} from "@chakra-ui/react";
import Head from "next/head";
import LoginForm from "../components/admin/LoginForm";
import Banner from "../components/Banner";
import HeaderButton from "../components/mini/HeaderButton";
import {withSessionSsr} from "../lib/session/withSession";


// If the users is already logged in then redirect to the overview page
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
        <Banner />
        <Center>
          <LoginForm/>
        </Center>
      </>
  );
}