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
import { PlusCircle } from "lucide-react";
import { useIntl } from "react-intl";

interface CreateTransactionModalProps {
  onTransactionCreated?: () => void;
  userId?: string | null;
}

const CreateTransactionModal = ({
  onTransactionCreated,
  userId,
}: CreateTransactionModalProps) => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
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
    setCategory("");
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
        setError(
          formatMessage({ id: "createTransactionModal.descriptionRequired" })
        );
        return;
      }
      if (!value.trim()) {
        setError(formatMessage({ id: "createTransactionModal.valueRequired" }));
        return;
      }
      if (!type) {
        setError(formatMessage({ id: "createTransactionModal.typeRequired" }));
        return;
      }

      if (!category) {
        setError(
          formatMessage({ id: "createTransactionModal.categoryRequired" })
        );
        return;
      }

      const numericValue = parseFloat(value);
      if (isNaN(numericValue) || numericValue <= 0) {
        setError(
          formatMessage({ id: "createTransactionModal.valueValidation" })
        );
        return;
      }

      if (!userId) {
        setError(
          formatMessage({ id: "createTransactionModal.userNotAuthenticated" })
        );
        setLoading(false);
        return;
      }

      const transactionData: Transaction = {
        userId: userId,
        description: description.trim(),
        value: numericValue,
        type,
        category,
      };

      await TransactionService.createTransaction(transactionData);

      resetForm();
      setOpen(false);

      setToastType("success");
      setShowToast(true);

      onTransactionCreated?.();
    } catch (err) {
      console.error(
        formatMessage({ id: "createTransactionModal.createErrorPrefix" }),
        err
      );
      setError(formatMessage({ id: "createTransactionModal.createError" }));
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
              ? formatMessage({ id: "createTransactionModal.createSuccess" })
              : formatMessage({ id: "createTransactionModal.createError" })
          }
          duration={2000}
        />
      )}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button
            disabled={isDisabled}
            style={{ cursor: "pointer" }}
            size={"3"}
            radius="full"
          >
            <PlusCircle size={24} />
            {formatMessage({ id: "createTransactionModal.addTransaction" })}
          </Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>
            {formatMessage({ id: "createTransactionModal.addTransaction" })}
          </Dialog.Title>
          <Dialog.Description size="2" mb="4">
            {formatMessage({ id: "createTransactionModal.fillDetails" })}
          </Dialog.Description>

          {error && (
            <Text color="red" size="2" mb="3">
              {error}
            </Text>
          )}

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                {formatMessage({ id: "createTransactionModal.description" })}
              </Text>
              <TextField.Root
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={formatMessage({
                  id: "createTransactionModal.descriptionPlaceholder",
                })}
                disabled={loading}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                {formatMessage({ id: "createTransactionModal.value" })}
              </Text>
              <TextField.Root
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={formatMessage({
                  id: "createTransactionModal.valuePlaceholder",
                })}
                type="number"
                step="0.01"
                min="0"
                disabled={loading}
              />
            </label>

            <Flex gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  {formatMessage({ id: "createTransactionModal.type" })}
                </Text>
                <Select.Root
                  value={type}
                  onValueChange={setType}
                  disabled={loading}
                >
                  <Select.Trigger
                    placeholder={formatMessage({
                      id: "createTransactionModal.selectTypePlaceholder",
                    })}
                  />
                  <Select.Content position="popper">
                    <Select.Item value="INCOME">
                      {formatMessage({ id: "createTransactionModal.income" })}
                    </Select.Item>
                    <Select.Item value="EXPENSE">
                      {formatMessage({ id: "createTransactionModal.expense" })}
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
              </label>

              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  {formatMessage({ id: "createTransactionModal.category" })}
                </Text>
                <Select.Root
                  value={category}
                  onValueChange={setCategory}
                  disabled={loading}
                >
                  <Select.Trigger
                    placeholder={formatMessage({
                      id: "createTransactionModal.selectCategoryPlaceholder",
                    })}
                  />
                  <Select.Content position="popper">
                    <Select.Item value="FOOD">
                      {formatMessage({ id: "categories.FOOD" })}
                    </Select.Item>
                    <Select.Item value="TRANSPORTATION">
                      {formatMessage({ id: "categories.TRANSPORTATION" })}
                    </Select.Item>
                    <Select.Item value="UTILITIES">
                      {formatMessage({ id: "categories.UTILITIES" })}
                    </Select.Item>
                    <Select.Item value="ENTERTAINMENT">
                      {formatMessage({ id: "categories.ENTERTAINMENT" })}
                    </Select.Item>
                    <Select.Item value="HEALTHCARE">
                      {formatMessage({ id: "categories.HEALTHCARE" })}
                    </Select.Item>
                    <Select.Item value="EDUCATION">
                      {formatMessage({ id: "categories.EDUCATION" })}
                    </Select.Item>
                    <Select.Item value="PERSONAL_CARE">
                      {formatMessage({ id: "categories.PERSONAL_CARE" })}
                    </Select.Item>
                    <Select.Item value="GROCERIES">
                      {formatMessage({ id: "categories.GROCERIES" })}
                    </Select.Item>
                    <Select.Item value="RENT">
                      {formatMessage({ id: "categories.RENT" })}
                    </Select.Item>
                    <Select.Item value="SALARY">
                      {formatMessage({ id: "categories.SALARY" })}
                    </Select.Item>
                    <Select.Item value="INVESTMENTS">
                      {formatMessage({ id: "categories.INVESTMENTS" })}
                    </Select.Item>
                    <Select.Item value="PETS">
                      {formatMessage({ id: "categories.PETS" })}
                    </Select.Item>
                    <Select.Item value="OTHER">
                      {formatMessage({ id: "categories.OTHER" })}
                    </Select.Item>
                  </Select.Content>
                </Select.Root>
              </label>
            </Flex>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Button
              variant="soft"
              color="gray"
              onClick={handleCancel}
              disabled={loading}
              radius="full"
              style={{ cursor: "pointer" }}
            >
              {formatMessage({ id: "createTransactionModal.cancel" })}
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading}
              loading={loading}
              radius="full"
              style={{ cursor: "pointer" }}
            >
              {loading
                ? formatMessage({ id: "createTransactionModal.saving" })
                : formatMessage({ id: "createTransactionModal.save" })}
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default CreateTransactionModal;
