import {Heading, VStack} from "@chakra-ui/react";
import AdminLayout from "../../components/admin/AdminLayout";
import Head from "next/head";
import AdminOverviewController from "../../components/admin/AdminOverviewController";
import {withSessionSsr} from "../../lib/session/withSession";



export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req}) {
        const user = req.session.user;
        if (typeof user === "undefined") {
            return {
                redirect: {
                    destination: "/account/login",
                }
            }
        }
        if (user.admin !== true) {
            return {
                redirect: {
                    destination: "/admin/overview",
                }
            }
        }
    }
)

export default function AdminOverview(props) {
    return (
        <>
            <Head>
                <title>Overview</title>
            </Head>
            <AdminLayout>
                <VStack>
                    <Heading>Overview</Heading>
                    <AdminOverviewController/>
                </VStack>
            </AdminLayout>
        </>
    )
}