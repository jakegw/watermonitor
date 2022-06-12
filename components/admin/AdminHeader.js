import {Center, Heading} from "@chakra-ui/react";
import HeaderButton from "../mini/HeaderButton";


export default function AdminHeader() {

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
        <Center bg="#E2E8F0">
          <Heading pt={5} pb={5} size="2xl">
            Cape York Water Monitoring System
          </Heading>
        </Center>

        <Center bg="#E2E8F0">
          {
            links.map(link => (
                <HeaderButton key={link.text} text={link.text} href={link.href} />
            ))
          }
        </Center>

      </>
  );
}
