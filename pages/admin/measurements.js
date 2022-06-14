import AdminLayout from "../../components/admin/AdminLayout";
import CommunityController from "../../components/admin/community/CommunityController";
import MeasurementController from "../../components/admin/measurements/MeasurementController";
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

      const measurements = await prisma.Measurement.findMany({},
      );


      return {
        props: {
          user: user,
          measurements: measurements,
        },

      };
    },
);

export default function communities(props) {
  return (
      <>
        <AdminLayout name={"Measurements"}>
          <MeasurementController measurements={props.measurements} />
        </AdminLayout>

      </>
  );
}