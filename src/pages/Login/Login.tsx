import { Button, Flex, TextField } from "@radix-ui/themes";

const Login = () => {
  return (
    <Flex direction="column" align="center" justify="center" gap="4" m="9">
      <h1>Login Page</h1>
      <TextField.Root placeholder="Enter your username" size="3" />
      <TextField.Root
        placeholder="Enter your password"
        type="password"
        size="3"
      />
      <Button size="3" style={{ width: "200px" }}>
        Entrar
      </Button>
      <Button variant="ghost">Registre-se</Button>
    </Flex>
  );
};

export default Login;
