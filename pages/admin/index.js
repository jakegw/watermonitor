import {Heading, VStack} from "@chakra-ui/react";
import Head from "next/head";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminOverviewController from "../../components/admin/AdminOverviewController";
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
      return {
        props: {},
      };
    },
);

export default function AdminOverview(props) {
  return (
      <>
        <AdminLayout name={'Overview'}>
            <AdminOverviewController />
        </AdminLayout>
      </>
  );
}