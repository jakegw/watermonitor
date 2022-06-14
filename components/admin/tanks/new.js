import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {useState} from "react";

export default function NewTankModal() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [communities, setCommunities] = useState([]);
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const newTank = async (e) => {
    e.preventDefault();
    console.log("test");
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    const response = await fetch("/api/admin/tanks/new", {
      method: "POST",
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
  const updateSelection = async (e) => {
    console.log(e.target.value);
    if (selectedCommunities.includes(e.target.value)) {
      setSelectedCommunities(selectedCommunities.filter(c => c !== e.target.value));
    } else {
      setSelectedCommunities([...selectedCommunities, e.target.value]);
    }
    console.log(selectedCommunities);
  };
  const openModal = async (e) => {
    e.preventDefault();
    const c = await fetch("/api/admin/communities/all").then(res => res.json());
    console.log(c);
    setCommunities(c);
    onOpen();
  };


  return (
      <>
        <Button onClick={openModal}>New Tank</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Tank</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={newTank}>
                <FormControl>
                  <FormLabel>Name: </FormLabel>
                  <Input id={"name"} name="name" type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone: </FormLabel>
                  <Input id={"phone"} name="phone" type="tel" />
                </FormControl>
                <FormControl>
                  <FormLabel>Community: </FormLabel>
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
                <Button type={"submit"}>Submit</Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  );
}