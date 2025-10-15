import { Flex, Tabs, Checkbox, Button, Text } from "@radix-ui/themes";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { useIntl } from "react-intl";

interface TransactionFiltersProps {
  onFiltersChange: (filters: {
    types?: string[];
    categories?: string[];
  }) => void;
  initialFilters?: {
    types?: string[];
    categories?: string[];
  };
}

const TransactionFilters = ({
  onFiltersChange,
  initialFilters,
}: TransactionFiltersProps) => {
  const { formatMessage } = useIntl();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    initialFilters?.types || []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || []
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
    let newTypes: string[];

    if (checked) {
      newTypes = [...selectedTypes, type];
    } else {
      newTypes = selectedTypes.filter((t) => t !== type);
    }

    setSelectedTypes(newTypes);
    onFiltersChange({
      types: newTypes.length > 0 ? newTypes : undefined,
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories: string[];

    if (checked) {
      newCategories = [...selectedCategories, category];
    } else {
      newCategories = selectedCategories.filter((c) => c !== category);
    }

    setSelectedCategories(newCategories);
    onFiltersChange({
      types: selectedTypes.length > 0 ? selectedTypes : undefined,
      categories: newCategories.length > 0 ? newCategories : undefined,
    });
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
    onFiltersChange({});
  };

  const hasActiveFilters =
    selectedTypes.length > 0 || selectedCategories.length > 0;

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
          {hasActiveFilters && (
            <Text size="1" color="gray">
              ({selectedTypes.length + selectedCategories.length}{" "}
              {formatMessage({ id: "filters.selected" })})
            </Text>
          )}
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
            {selectedTypes.length > 0 && (
              <Text
                size="1"
                style={{ marginLeft: "4px", color: "var(--accent-9)" }}
              >
                ({selectedTypes.length})
              </Text>
            )}
          </Tabs.Trigger>
          <Tabs.Trigger value="category">
            {formatMessage({ id: "filters.categoryTab" })}
            {selectedCategories.length > 0 && (
              <Text
                size="1"
                style={{ marginLeft: "4px", color: "var(--accent-9)" }}
              >
                ({selectedCategories.length})
              </Text>
            )}
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="type" style={{ paddingTop: "16px" }}>
          <Flex direction="column" gap="3">
            <Text size="2" weight="medium" color="gray">
              {formatMessage({ id: "filters.selectTypes" })}
            </Text>
            <Flex gap="4" wrap="wrap">
              {types.map((type) => (
                <Flex key={type} align="center" gap="2">
                  <Checkbox
                    checked={selectedTypes.includes(type)}
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
            {selectedTypes.length > 0 && (
              <Flex gap="2" wrap="wrap">
                <Text size="1" color="gray">
                  {formatMessage({ id: "filters.selectedTypes" })}:
                </Text>
                {selectedTypes.map((type) => (
                  <Text
                    key={type}
                    size="1"
                    style={{
                      padding: "2px 6px",
                      backgroundColor: "var(--accent-3)",
                      borderRadius: "4px",
                    }}
                  >
                    {formatMessage({
                      id:
                        type === "INCOME"
                          ? "transaction.income"
                          : "transaction.expense",
                    })}
                  </Text>
                ))}
              </Flex>
            )}
          </Flex>
        </Tabs.Content>

        <Tabs.Content value="category" style={{ paddingTop: "16px" }}>
          <Flex direction="column" gap="3">
            <Text size="2" weight="medium" color="gray">
              {formatMessage({ id: "filters.selectCategories" })}
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
                    checked={selectedCategories.includes(category)}
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
            {selectedCategories.length > 0 && (
              <Flex gap="2" wrap="wrap" style={{ marginTop: "8px" }}>
                <Text size="1" color="gray">
                  {formatMessage({ id: "filters.selectedCategories" })}:
                </Text>
                {selectedCategories.map((category) => (
                  <Text
                    key={category}
                    size="1"
                    style={{
                      padding: "2px 6px",
                      backgroundColor: "var(--accent-3)",
                      borderRadius: "4px",
                    }}
                  >
                    {formatMessage({
                      id: `category.${category.toLowerCase()}`,
                    })}
                  </Text>
                ))}
              </Flex>
            )}
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
};

export default TransactionFilters;
