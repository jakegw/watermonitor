import {
  Button,
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
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {useState} from "react";

export default function ModifyCommunityModal(props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [name, setName] = useState("test");
  const [data, setData] = useState({
    name: "",

  });

  const openModal = async (e) => {
    e.preventDefault();
    const c = await fetch(`/api/admin/communities/${props.id}`).then(res => res.json());
    console.log(c);
    setData(c);
    onOpen();
  };

  const modifyCommunity = async (e) => {
    e.preventDefault();
    console.log("test");
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    const response = await fetch("/api/admin/communities/update", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      location.reload();
    }

  };

  const deleteCommunity = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/admin/communities/delete/`, {
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
        <Button onClick={openModal}>Modify Community</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modify Community - {data.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={modifyCommunity}>
                <Stack>
                  <FormControl hidden> {/* Lazy way of submitting the ID for form */}
                    <Input id={"id"} name="id" type="text" value={props.id} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Name: </FormLabel>
                    <Input id={"name"} name="name" type="text" defaultValue={data.name} />
                  </FormControl>
                  <Flex>
                    <Button type={"submit"}>Submit</Button>
                    <Spacer />
                    <Button colorScheme={"red"} onClick={deleteCommunity}>Delete</Button>
                  </Flex>

                </Stack>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  );
}