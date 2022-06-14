import AdminLayout from "../../components/admin/AdminLayout";
import TankController from "../../components/admin/tanks/TankController";
import UserController from "../../components/admin/user/UserController";
import prisma from "../../lib/prisma";
import {withSessionSsr} from "../../lib/session/withSession";


export const getServerSideProps = withSessionSsr(
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

      const tanks = await prisma.Tank.findMany({
        include: {
          communities: true,
        }
      });


      return {
        props: {
          user: user,
          tanks: tanks,
        },

      };
    },
);

export default function users(props) {
  return (
      <>
        <AdminLayout name={"Water Tanks"}>
          <TankController tanks={props.tanks} />
        </AdminLayout>

      </>
  );
}