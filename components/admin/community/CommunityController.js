import {Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import NewUserModal from "../user/new";
import ModifyCommunityModal from "./modify";
import NewCommunityModal from "./new";

export default function CommunityController(props) {
  return (
      <>
        <Box>
          {/*<Button onClick={() => console.log(props.users)}></Button>*/}
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Community ID</Th>
                  <Th>Name</Th>
                  <Th>Modify</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.communities.map(community => (<Tr key={community.id}>
                  <Td>{community.id}</Td>
                  <Td>{community.name}</Td>
                  <Td><ModifyCommunityModal id={community.id}/></Td>
                </Tr>))}
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td><NewCommunityModal /></Td>
                </Tr>

              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
  )
}