import { AlertDialog, Button, Flex } from "@radix-ui/themes";

interface DeleteDialogProps {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  handleDeleteCancel: () => void;
  handleDeleteConfirm: () => void;
}

const DeleteDialog = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleDeleteCancel,
  handleDeleteConfirm,
}: DeleteDialogProps) => {
  return (
    <AlertDialog.Root
      open={deleteDialogOpen}
      onOpenChange={setDeleteDialogOpen}
    >
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete transaction</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this transaction? This action cannot
          be undone.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              onClick={handleDeleteCancel}
              style={{ cursor: "pointer" }}
              radius="full"
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={handleDeleteConfirm}
              radius="full"
              style={{ cursor: "pointer" }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteDialog;
