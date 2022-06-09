import {
  Button, FormControl, FormLabel, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export default function NewCommunityModal() {
  const {isOpen, onOpen, onClose} = useDisclosure();


  const newCommunity = async (e) => {
    e.preventDefault();
    console.log("test");
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    const response = await fetch('/api/admin/communities/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    })

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