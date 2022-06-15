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
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {useState} from "react";

export default function ModifyTankModal(props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [name, setName] = useState("test");
  const [data, setData] = useState({
    name: "",

  });
  const [communities, setCommunities] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const updateSelection = async (e) => {
    console.log(e.target.value);
    if (selectedCommunities.includes(e.target.value)) {
      setSelectedCommunities(selectedCommunities.filter(c => c !== e.target.value));
    } else {
      setSelectedCommunities([...selectedCommunities, e.target.value]);
    }
    console.log(selectedCommunities);
  }

  const openModal = async (e) => {
    e.preventDefault();
    const c = await fetch(`/api/admin/communities/all`).then(res => res.json());
    const t = await fetch(`/api/admin/tanks/${props.id}`).then(res => res.json());
    console.log(t)
    let mapped = t.communities
    mapped = mapped.map(co => (co.id.toString()))
    console.log(mapped)
    setSelectedCommunities(mapped);

    console.log(c);
    setData(t);
    setCommunities(c);
    onOpen();
  };

  const modifyTank = async (e) => {
    e.preventDefault();
    console.log("test");
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    const response = await fetch("/api/admin/tanks/update", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...formData,
        communities: selectedCommunities}),
    });
    if (response.ok) {
      location.reload();
    }

  };

  const deleteTank = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/admin/tanks/delete/`, {
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
        <Button onClick={openModal}>Modify Tank</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modify Tank - {data.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={modifyTank}>
                <Stack>
                  <FormControl hidden> {/* Lazy way of submitting the ID for form */}
                    <Input id={"id"} name="id" type="text" value={props.id} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Name: </FormLabel>
                    <Input id={"name"} name="name" type="text" defaultValue={data.name} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Phone: </FormLabel>
                    <Input id={"phone"} name="phone" type="tel" defaultValue={data.phone} />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Capacity (L): </FormLabel>
                    <Input id={"capacity"} name="capacity" type="number" defaultValue={data.capacity}/>
                  </FormControl>
                  <Stack>
                    {communities.map((community) => {
                      return (
                          <Checkbox
                              key={community.id}
                              isChecked={selectedCommunities.includes(community.id.toString())}
                              onChange={updateSelection}
                              value={community.id}
                          >{community.name}</Checkbox>
                      )})
                    }
                  </Stack>
                  <Flex>
                    <Button type={"submit"}>Submit</Button>
                    <Spacer />
                    <Button colorScheme={"red"} onClick={deleteTank}>Delete</Button>
                  </Flex>

                </Stack>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  );
}