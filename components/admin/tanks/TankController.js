import {Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import ModifyTankModal from "./modify";
import ModifyCommunityModal from "./modify";
import NewTankModal from "./new";
import NewCommunityModal from "./new";

export default function TankController(props) {
  return (
      <>
        <Box>
          {/*<Button onClick={() => console.log(props.users)}></Button>*/}
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Tank ID</Th>
                  <Th>Name</Th>
                  <Th>Phone</Th>
                  <Th>Capacity (L)</Th>
                  <Th>Communities</Th>
                  <Th>Modify</Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.tanks.map(tank => (<Tr key={tank.id}>
                  <Td>{tank.id}</Td>
                  <Td>{tank.name}</Td>
                  <Td>{tank.phone}</Td>
                  <Td>{tank.capacity}</Td>
                  <Td>{tank.communities.map(c => (
                        <Text key={c.id}>{c.name}</Text>
                    ))}</Td>
                  <Td><ModifyTankModal id={tank.id} /></Td>
                </Tr>))}
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td><NewTankModal /></Td>
                </Tr>

              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
  );
}