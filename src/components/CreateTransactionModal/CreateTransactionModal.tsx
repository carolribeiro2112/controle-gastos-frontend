import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState, useEffect } from "react";
import TransactionService, {
  type Transaction,
} from "../../services/TransactionService/TransactionService";
import { getUserRoleFromToken } from "../../utils/getUserData";
import Toast from "../Toast/Toast";

interface CreateTransactionModalProps {
  onTransactionCreated?: () => void;
  userId?: string | null;
}

const CreateTransactionModal = ({
  onTransactionCreated,
  userId,
}: CreateTransactionModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const userRole = getUserRoleFromToken();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const resetForm = () => {
    setDescription("");
    setValue("");
    setType("");
    setError(null);
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      setError(null);
      setLoading(true);

      // Form validation
      if (!description.trim()) {
        setError("Description is required");
        return;
      }
      if (!value.trim()) {
        setError("Value is required");
        return;
      }
      if (!type) {
        setError("Type is required");
        return;
      }

      const numericValue = parseFloat(value);
      if (isNaN(numericValue) || numericValue <= 0) {
        setError("Please enter a valid positive number for value");
        return;
      }

      if (!userId) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const transactionData: Transaction = {
        userId: userId,
        description: description.trim(),
        value: numericValue,
        type,
      };

      await TransactionService.createTransaction(transactionData);

      resetForm();
      setOpen(false);

      setToastType("success");
      setShowToast(true);

      onTransactionCreated?.();
    } catch (err) {
      console.error("Error creating transaction:", err);
      setError("Failed to create transaction. Please try again.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = userRole === "USER";

  return (
    <>
      {showToast && (
        <Toast
          type={toastType}
          message={
            toastType === "success"
              ? "Your transaction has been successfully created."
              : "Failed to create transaction. Please try again."
          }
          duration={2000}
        />
      )}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button disabled={isDisabled} style={{ cursor: "pointer" }}>
            Add new transaction
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add new transaction</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Fill in the details below to add a new transaction.
          </Dialog.Description>

          {error && (
            <Text color="red" size="2" mb="3">
              {error}
            </Text>
          )}

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description
              </Text>
              <TextField.Root
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the description"
                disabled={loading}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Value
              </Text>
              <TextField.Root
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter the value"
                type="number"
                step="0.01"
                min="0"
                disabled={loading}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Type
              </Text>
              <Select.Root
                value={type}
                onValueChange={setType}
                disabled={loading}
              >
                <Select.Trigger placeholder="Select the type" />
                <Select.Content>
                  <Select.Item value="INCOME">Income</Select.Item>
                  <Select.Item value="EXPENSE">Expense</Select.Item>
                </Select.Content>
              </Select.Root>
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Button
              variant="soft"
              color="gray"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading} loading={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default CreateTransactionModal;
