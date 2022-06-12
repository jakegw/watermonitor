export async function getStaticProps() {
  return {
    redirect: {
      destination: "/api/logout",
      permanent: false,
    }, // will be passed to the page component as props
  };
}


export default async function Logout() {
  // Empty just so logout redirects to api
}