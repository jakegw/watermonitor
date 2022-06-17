export async function getStaticProps() {
  return {
    redirect: {
      destination: "/api/logout",
      permanent: false,
    }, };
}


export default async function Logout() {
  // Empty just so logout redirects to api
}