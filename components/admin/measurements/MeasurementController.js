import {Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";

// This function returns the table of communities.

export default function MeasurementController(props) {
  return (
    <>
      <Box>
        <TableContainer>
          <Table>
            <Thead>
                <Tr>
                    <Th>Measurement ID</Th>
                    <Th>Tank Name</Th>
                    <Th>Date</Th>
                    <Th>Volume</Th>
                    <Th>Quality</Th>
                    <Th>Modify</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.measurements.map(measurement => (
                    <Tr key={measurement.id}>
                        <Td>{measurement.id}</Td>
                        <Td>{measurement.Tank.name}</Td>
                        <Td>{measurement.time.toLocaleString()}</Td>
                        <Td>{measurement.volume}</Td>
                        <Td>{measurement.quality && (measurement.quality + "%")}</Td>
                        {/*<Td><ModifyMeasurementModal id={measurement.id} /></Td>*/}
                    </Tr>
                ))}
            </Tbody>
            </Table>
        </TableContainer>
      </Box>
    </>
  );
}