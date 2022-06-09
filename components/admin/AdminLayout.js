import {Center} from "@chakra-ui/react";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({children}) {
    return (
        <>
        <AdminHeader/>
        <main className="container">
            <Center>
                {children}
            </Center>
        </main>
        </>
    )
}