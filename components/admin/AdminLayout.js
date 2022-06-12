import {Center, Heading, VStack} from "@chakra-ui/react";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({children, ...props}) {
  return (
      <>
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