import AdminLayout from "../../components/admin/AdminLayout";
import CommunityController from "../../components/admin/community/CommunityController";
import MeasurementController from "../../components/admin/measurements/MeasurementController";
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

      const measurements = await prisma.Measurement.findMany({
        include: {
          Tank:{
            select: {
                name: true,
              id: true,
            }
          }
        }
          },
      );

      //console.log(measurements[0].time.toTimeString())
      return {
        props: {
          user: user,
          measurements: measurements.reverse(),
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