import { Button, Flex, Heading, TextField } from "@radix-ui/themes";

const Login = () => {
  return (
    <Flex direction="column" align="center" justify="center" gap="4" m="9">
      <Heading as="h1" size="9" color="teal">
        Controle de gastos
      </Heading>
      <Heading as="h1" size="8" color="teal">
        Login to your account
      </Heading>
      <TextField.Root
        placeholder="Enter your username"
        size="3"
        style={{ width: "300px" }}
      />
      <TextField.Root
        placeholder="Enter your password"
        type="password"
        size="3"
        style={{ width: "300px" }}
      />
      <Button size="3" style={{ width: "300px" }} color="teal">
        Entrar
      </Button>
      <Button variant="ghost" color="teal" size="3" style={{ width: "275px" }}>
        Registre-se
      </Button>
    </Flex>
  );
};

export default Login;
