import {Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import ModifyUserModal from "./modify";
import NewUserModal from "./new";

export default function UserController(props) {
  return (
      <Box>
        {/*<Button onClick={() => console.log(props.users)}></Button>*/}
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>User ID</Th>
                <Th>Name</Th>
                <Th>Phone Number</Th>
                <Th>Communities</Th>
                <Th>Modify</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.users.map(user => (
                  <Tr key={user.id}>
                    <Td>{user.id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.phone}</Td>
                    <Td>{user.communities.map(c => (
                        <Text>{c.name}</Text>
                    ))}</Td>
                    <Td><ModifyUserModal id={user.id}/></Td>
                  </Tr>
              ))}
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td><NewUserModal /></Td>
              </Tr>

            </Tbody>
          </Table>
        </TableContainer>
      </Box>
  );
}