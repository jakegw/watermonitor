import {Center, Heading} from "@chakra-ui/react";
import Banner from "../Banner";
import HeaderButton from "../mini/HeaderButton";


export default function AdminHeader() {


  // List of links to the different pages of the admin panel.
  const links = [
    {text: "Overview", href: "/admin/"},
    {text: "Users", href: "/admin/users"},
    {text: "Tanks", href: "/admin/tanks"},
    {text: "Recent Measurements", href: "/admin/measurements"},
    {text: "Communities", href: "/admin/communities"},

    {text: "Logout", href: "/logout"},
  ];

  return (
      <>
       <Banner />

        <Center bg="#E2E8F0">
          {
            // Iterates through the links array and creates a button for each one.
            links.map(link => (
                <HeaderButton key={link.text} text={link.text} href={link.href} />
            ))
          }
        </Center>

      </>
  );
}
