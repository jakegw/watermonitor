import AdminLayout from "../../components/admin/AdminLayout";
import {Heading, VStack} from "@chakra-ui/react";
import {withSessionSsr} from "../../lib/session/withSession";
import prisma from "../../lib/prisma";
import CommunityController from "../../components/admin/community/CommunityController";


export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({req}) {
        const user = req.session.user;
        if (typeof user === "undefined") {
            return {
                redirect: {
                    destination: "/login",
                }
            }
        }
        if (user.admin !== true) {
            return {
                redirect: {
                    destination: "/login",
                }
            }
        }

        const communities = await prisma.Community.findMany({

            }
        )


        return {
            props: {
                user: user,
                communities: communities
            }

        }
    }
);

export default function communities(props){
    return (
        <>
            <AdminLayout>
                <VStack>
                    <Heading>Communities</Heading>
                    <CommunityController communities={props.communities}/>
                </VStack>
            </AdminLayout>

        </>
    )
}