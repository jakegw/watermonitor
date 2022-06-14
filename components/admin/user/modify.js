import {
  Button, Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack, Text, useCheckboxGroup,
  useDisclosure,
} from "@chakra-ui/react";
import {useState} from "react";

export default function ModifyUserModal(props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [data, setData] = useState({
    name: "",
  });
  const [communities, setCommunities] = useState([]);



  const openModal = async (e) => {
    e.preventDefault();
    const u = await fetch(`/api/admin/users/${props.id}`).then(res => res.json());
    const c = await fetch(`/api/admin/communities/all`).then(res => res.json());
    console.log(u);
    setData(u);
    setCommunities(c)
    onOpen();
  };

  const modifyUser = async (e) => {
    e.preventDefault();
    console.log("test");
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    const response = await fetch("/api/admin/users/update", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      location.reload();
    }

  };

  const deleteUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/admin/users/delete/`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: props.id}),

    })
    if (response.ok) {
      location.reload();
    }
  }

  return (
      <>
        <Button onClick={openModal}>Modify User</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modify User - {data.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={modifyUser}>
                <Stack>
                  <FormControl hidden> {/* Lazy way of submitting the ID for form */}
                    <Input id={"id"} name="id" type="text" value={props.id} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Name: </FormLabel>
                    <Input id={"name"} name="name" type="text" defaultValue={data.name} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone Number: </FormLabel>
                    <Input id={"phone"} name="phone" type="phone" defaultValue={data.phone} />
                  </FormControl>

                  <Stack>
                      {communities.map((community) => {
                        return (
                            <Checkbox>{community.name}</Checkbox>
                        )})
                      }
                  </Stack>

                  <Flex>
                    <Button type={"submit"}>Submit</Button>
                    <Spacer />
                    <Button colorScheme={"red"} onClick={deleteUser}>Delete</Button>
                  </Flex>

                </Stack>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  );
}