import {Center, Heading, VStack} from "@chakra-ui/react";
import Head from "next/head";
import AdminHeader from "./AdminHeader";


// A wrapper to ensure that all pages have a consistent layout.
export default function AdminLayout({children, ...props}) {
  return (
      <>
        {props.name && <Head>
            <title>{props.name}</title>
        </Head>}
        <AdminHeader />
        <main className="container">
          <Center>
            <VStack>
              {props.name && <Heading>{props.name}</Heading>}
              {children}
            </VStack>
          </Center>
        </main>
      </>
  );
}