import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useIntl } from "react-intl";

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
  const { formatMessage } = useIntl();
  return (
    <AlertDialog.Root
      open={deleteDialogOpen}
      onOpenChange={setDeleteDialogOpen}
    >
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>
          {formatMessage({ id: "deleteDialog.title" })}
        </AlertDialog.Title>
        <AlertDialog.Description size="2">
          {formatMessage({ id: "deleteDialog.confirmation" })}
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
              {formatMessage({ id: "deleteDialog.cancel" })}
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
              {formatMessage({ id: "deleteDialog.delete" })}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteDialog;
