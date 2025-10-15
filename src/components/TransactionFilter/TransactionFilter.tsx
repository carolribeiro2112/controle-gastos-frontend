import { Flex, Tabs, Checkbox, Button, Text } from "@radix-ui/themes";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { useIntl } from "react-intl";

interface TransactionFiltersProps {
  onFiltersChange: (filters: { type?: string; category?: string }) => void;
  initialFilters?: {
    type?: string;
    category?: string;
  };
}

const TransactionFilters = ({
  onFiltersChange,
  initialFilters,
}: TransactionFiltersProps) => {
  const { formatMessage } = useIntl();
  const [selectedType, setSelectedType] = useState<string | undefined>(
    initialFilters?.type
  );
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    initialFilters?.category
  );

  const categories = [
    "FOOD",
    "TRANSPORTATION",
    "UTILITIES",
    "ENTERTAINMENT",
    "HEALTHCARE",
    "EDUCATION",
    "PERSONAL_CARE",
    "GROCERIES",
    "RENT",
    "SALARY",
    "PETS",
    "INVESTMENTS",
    "OTHER",
  ];

  const types = ["INCOME", "EXPENSE"];

  const handleTypeChange = (type: string, checked: boolean) => {
    const newType = checked ? type : undefined;
    setSelectedType(newType);
    onFiltersChange({ type: newType, category: selectedCategory });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategory = checked ? category : undefined;
    setSelectedCategory(newCategory);
    onFiltersChange({ type: selectedType, category: newCategory });
  };

  const clearFilters = () => {
    setSelectedType(undefined);
    setSelectedCategory(undefined);
    onFiltersChange({});
  };

  const hasActiveFilters = selectedType || selectedCategory;

  return (
    <Flex
      direction="column"
      gap="3"
      p="3"
      style={{
        border: "1px solid var(--gray-a6)",
        borderRadius: "8px",
        backgroundColor: "var(--gray-a2)",
        width: "100%",
      }}
    >
      <Flex align="center" justify="between">
        <Flex align="center" gap="2">
          <Filter size={16} />
          <Text weight="medium">{formatMessage({ id: "filters.title" })}</Text>
        </Flex>
        {hasActiveFilters && (
          <Button variant="ghost" size="1" onClick={clearFilters}>
            <X size={14} />
            {formatMessage({ id: "filters.clear" })}
          </Button>
        )}
      </Flex>

      <Tabs.Root defaultValue="type" style={{ width: "100%" }}>
        <Tabs.List>
          <Tabs.Trigger value="type">
            {formatMessage({ id: "filters.typeTab" })}
          </Tabs.Trigger>
          <Tabs.Trigger value="category">
            {formatMessage({ id: "filters.categoryTab" })}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="type" style={{ paddingTop: "16px" }}>
          <Flex direction="column" gap="3">
            <Text size="2" weight="medium" color="gray">
              {formatMessage({ id: "filters.selectType" })}
            </Text>
            <Flex gap="4" wrap="wrap">
              {types.map((type) => (
                <Flex key={type} align="center" gap="2">
                  <Checkbox
                    checked={selectedType === type}
                    onCheckedChange={(checked) =>
                      handleTypeChange(type, checked === true)
                    }
                  />
                  <Text size="2">
                    {formatMessage({
                      id:
                        type === "INCOME"
                          ? "transaction.income"
                          : "transaction.expense",
                    })}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Tabs.Content>

        <Tabs.Content value="category" style={{ paddingTop: "16px" }}>
          <Flex direction="column" gap="3">
            <Text size="2" weight="medium" color="gray">
              {formatMessage({ id: "filters.selectCategory" })}
            </Text>
            <Flex
              gap="4"
              wrap="wrap"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              {categories.map((category) => (
                <Flex
                  key={category}
                  align="center"
                  gap="2"
                  style={{ minWidth: "140px" }}
                >
                  <Checkbox
                    checked={selectedCategory === category}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked === true)
                    }
                  />
                  <Text size="2">
                    {formatMessage({
                      id: `category.${category.toLowerCase()}`,
                    })}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
};

export default TransactionFilters;
