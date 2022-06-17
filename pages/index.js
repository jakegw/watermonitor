import {Center, Stack, Text} from "@chakra-ui/react";
import Head from "next/head";
import Banner from "../components/Banner";
import HeaderButton from "../components/mini/HeaderButton";


// Overview page detailing to the user about the system
// More needs to be added to this page
export default function Home() {
  return (
      <>
        <Head>
            <title>Home</title>
        </Head>
        <Banner />
        <Center>
          <Stack>
            <HeaderButton text={"Admin Panel"} href={"/login"} />
            <Text>{`This is a tool designed to aid in monitoring local water sources.
                To receive alerts please contact the area administrator.`}</Text>

          </Stack>
        </Center>
      </>
  );
}
