import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

// This function returns a button that, when clicked, opens a modal that allows the user to create a new community.
export default function NewCommunityModal() {
  const {isOpen, onOpen, onClose} = useDisclosure();


  const newCommunity = async (e) => {
    e.preventDefault();
    // console.log("test");
    const formData = Object.fromEntries(new FormData(e.target).entries());
    // console.log(formData);
    const response = await fetch("/api/admin/communities/new", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      location.reload();

    }

  };

  return (
      <>
        <Button onClick={onOpen}>New Community</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Community</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={newCommunity}>
                <FormControl>
                  <FormLabel>Name: </FormLabel>
                  <Input id={"name"} name="name" type="text" />
                </FormControl>
                <Button type={"submit"}>Submit</Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  );
}