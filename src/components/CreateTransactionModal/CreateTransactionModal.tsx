import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

const CreateTransactionModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Add new transaction</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add new transaction</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill in the details below to add a new transaction.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextField.Root
              defaultValue="Wage"
              placeholder="Enter the description"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Value
            </Text>
            <TextField.Root defaultValue="5000" placeholder="Enter the value" />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Type
            </Text>
            <TextField.Root
              defaultValue="INCOME"
              placeholder="Enter the type"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreateTransactionModal;
