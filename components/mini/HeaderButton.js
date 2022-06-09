import Link from "next/link";
import {Button} from "@chakra-ui/react";

export default function HeaderButton({text, href}) {
    return (
        <Link href={href} passHref>
            <Button margin={3.5} paddingx={5} minW={100} bg='blue.300' boxShadow={'base'}>{text}</Button>
        </Link>
    )
}