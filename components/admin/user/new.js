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

export default function NewUserModal() {
  const {isOpen, onOpen, onClose} = useDisclosure();


  const addUser = async (e) => {
    e.preventDefault();
    console.log("test");
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    const response = await fetch("/api/admin/users/new", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData),
    });

  };

  return (
      <>
        <Button onClick={onOpen}>New User</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={addUser}>
                <FormControl>
                  <FormLabel>Name: </FormLabel>
                  <Input id={"name"} name="name" type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone: </FormLabel>
                  <Input id={"phone"} name="phone" type="tel" />
                </FormControl>
                <Button type={"submit"}>Submit</Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
  );
}