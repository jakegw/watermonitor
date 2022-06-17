import {
  Button,
  Checkbox,
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

export default function ModifyUserModal(props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [data, setData] = useState({
    name: "",
  });
  const [communities, setCommunities] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState([]);


  const updateSelection = async (e) => {
    //console.log(e.target.value);
    if (selectedCommunities.includes(e.target.value)) {
      //Selectedcommunities is an array, so if it is already in the array it gets filtered out

      setSelectedCommunities(selectedCommunities.filter(c => c !== e.target.value));
    } else {
      // If not in the array then gets added
      setSelectedCommunities([...selectedCommunities, e.target.value]);
    }
    //console.log(selectedCommunities);
  };

  const openModal = async (e) => {
    e.preventDefault();
    const u = await fetch(`/api/admin/users/${props.id}`).then(res => res.json());
    const c = await fetch(`/api/admin/communities/all`).then(res => res.json());
    let mapped = u.communities;
    mapped = mapped.map(co => (co.id.toString()));
    //console.log(mapped)
    setSelectedCommunities(mapped);


    setData(u);
    setCommunities(c);

    onOpen();
  };

  const modifyUser = async (e) => {
    e.preventDefault();
    //console.log("test");
    const formData = Object.fromEntries(new FormData(e.target).entries());
    //console.log(formData);
    const response = await fetch("/api/admin/users/update", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        ...formData,
        communities: selectedCommunities,
      }),
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

    });
    if (response.ok) {
      location.reload();
    }
  };

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
                  <FormControl>
                    <FormLabel>Communities: </FormLabel>

                    <Stack>
                      {communities.map((community) => {
                        return (
                            <Checkbox
                                key={community.id}
                                isChecked={selectedCommunities.includes(community.id.toString())}
                                onChange={updateSelection}
                                value={community.id}
                            >{community.name}</Checkbox>
                        );
                      })
                      }
                    </Stack>
                  </FormControl>
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