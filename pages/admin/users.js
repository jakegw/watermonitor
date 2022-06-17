import AdminLayout from "../../components/admin/AdminLayout";
import UserController from "../../components/admin/user/UserController";
import prisma from "../../lib/prisma";
import {withSessionSsr} from "../../lib/session/withSession";


export const getServerSideProps = withSessionSsr(
    // Get server side props verifies if the user is an admin and then fetches the data

    async function getServerSideProps({req}) {
      const user = req.session.user;
      if (typeof user === "undefined") {
        return {
          redirect: {
            destination: "/login",
          },
        };
      }
      if (user.admin !== true) {
        return {
          redirect: {
            destination: "/login",
          },
        };
      }

      const users = await prisma.User.findMany({
        include: {
          communities: {
            select: {
                name: true,
            }
          },
        }
      });


      return {
        props: {
          user: user,
          users: users,
        },

      };
    },
);

export default function users(props) {
  return (
      <>
        <AdminLayout name={"Users"}>
          <UserController users={props.users} />
        </AdminLayout>

      </>
  );
}