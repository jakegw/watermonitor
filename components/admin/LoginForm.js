import {Button, FormControl, FormLabel, Input} from "@chakra-ui/react";

export default function LoginForm() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const data = JSON.stringify(formData);
    const options = {
      method: "POST",
      body: data,
      headers: {"Content-Type": "application/json"},
    };
    const response = await fetch("/api/login", options);
    location.reload();

  };

  return (
      <>

        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="user">User</FormLabel>
            <Input id="user" name="user" type="text" required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="pass">Password</FormLabel>
            <Input id="pass" name="pass" type="password" autoComplete="current-password" required />
          </FormControl>
          <Button m={3} type="submit">Submit</Button>


        </form>

      </>
  );
}
