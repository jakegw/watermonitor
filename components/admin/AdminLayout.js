import {Center} from "@chakra-ui/react";

export default function AdminLayout({children}) {
    return (
        <>
        <main className="container">
            <Center>
                {children}
            </Center>
        </main>
        </>
    )
}