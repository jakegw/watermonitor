import AdminLayout from "../../components/admin/AdminLayout";
import CommunityController from "../../components/admin/community/CommunityController";
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

      const communities = await prisma.Community.findMany({},
      );


      return {
        props: {
          user: user,
          communities: communities,
        },

      };
    },
);

export default function communities(props) {
  return (
      <>
        <AdminLayout name={"Communities"}>
          <CommunityController communities={props.communities} />
        </AdminLayout>

      </>
  );
}