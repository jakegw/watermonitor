import AdminLayout from "../../components/admin/AdminLayout";
import {Heading, VStack} from "@chakra-ui/react";
import UserController from "../../components/admin/user/UserController";
import {withSessionSsr} from "../../lib/session/withSession";
import prisma from "../../lib/prisma";


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

        const users = await prisma.User.findMany({

            }
        )


        return {
            props: {
                user: user,
                users: users
            }

        }
    }
);

export default function users(props){
    return (
        <>
            <AdminLayout>
                <VStack>
                    <Heading>Users</Heading>
                    <UserController users={props.users}/>

                </VStack>
            </AdminLayout>

        </>
    )
}