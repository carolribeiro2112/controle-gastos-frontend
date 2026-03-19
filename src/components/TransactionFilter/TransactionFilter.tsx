import {
  Flex,
  Tabs,
  Checkbox,
  Button,
  Text,
  Popover,
  Separator,
} from "@radix-ui/themes";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { useIntl } from "react-intl";
import DatePicker from "../DatePicker/DatePicker";

interface TransactionFiltersProps {
  onFiltersChange: (filters: {
    types?: string[];
    categories?: string[];
    startDate?: string;
    endDate?: string;
  }) => void;
  initialFilters?: {
    types?: string[];
    categories?: string[];
    startDate?: string;
    endDate?: string;
  };
}

const TransactionFilters = ({
  onFiltersChange,
  initialFilters,
}: TransactionFiltersProps) => {
  const { formatMessage } = useIntl();
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    initialFilters?.types || [],
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters?.categories || [],
  );

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

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
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories: string[];

    if (checked) {
      newCategories = [...selectedCategories, category];
    } else {
      newCategories = selectedCategories.filter((c) => c !== category);
    }

    setSelectedCategories(newCategories);
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
    setStartDate(undefined);
    setEndDate(undefined);
    onFiltersChange({});
  };

  const handleApplyFilters = () => {
    onFiltersChange({
      types: selectedTypes.length > 0 ? selectedTypes : undefined,
      categories:
        selectedCategories.length > 0 ? selectedCategories : undefined,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined,
    });
  };

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedCategories.length > 0 ||
    !!startDate ||
    !!endDate;

  const activeFiltersCount =
    selectedTypes.length +
    selectedCategories.length +
    (startDate ? 1 : 0) +
    (endDate ? 1 : 0);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          variant="outline"
          style={{ position: "relative", marginTop: "26px", cursor: "pointer" }}
          size="3"
          radius="large"
        >
          <Filter size={16} />
          {formatMessage({ id: "filters.title" })}
          {hasActiveFilters && (
            <Flex
              align="center"
              justify="center"
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "var(--accent-9)",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {activeFiltersCount}
            </Flex>
          )}
        </Button>
      </Popover.Trigger>

      <Popover.Content
        style={{ width: "400px", maxWidth: "90vw", height: "auto" }}
      >
        <Flex direction="column" gap="3">
          <Flex align="center" justify="between">
            <Flex align="center" gap="2">
              <Filter size={16} />
              <Text weight="medium">
                {formatMessage({ id: "filters.title" })}
              </Text>
              {hasActiveFilters && (
                <Text size="1" color="gray">
                  ({activeFiltersCount}{" "}
                  {formatMessage({ id: "filters.selected" })})
                </Text>
              )}
            </Flex>
            {hasActiveFilters && (
              <Button variant="ghost" size="1" onClick={clearFilters}>
                <X size={14} />
                {formatMessage({ id: "filters.clearFilters" })}
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
              <Tabs.Trigger value="date">
                {formatMessage({
                  id: "filters.dateTab",
                  defaultMessage: "Date",
                })}
                {startDate && (
                  <Text
                    size="1"
                    style={{ marginLeft: "4px", color: "var(--accent-9)" }}
                  >
                    {/* Exibe a data selecionada */}
                    {startDate.toLocaleDateString()}
                  </Text>
                )}
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
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={(checked) =>
                          handleTypeChange(type, checked === true)
                        }
                      />
                      <Text size="2">
                        {formatMessage({
                          id:
                            type === "INCOME"
                              ? "createTransactionModal.income"
                              : "createTransactionModal.expense",
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
                              ? "createTransactionModal.income"
                              : "createTransactionModal.expense",
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
                  {formatMessage({ id: "filters.selectCategory" })}
                </Text>
                <Flex
                  gap="4"
                  wrap="wrap"
                  style={{ maxHeight: "250px", overflowY: "hidden" }}
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
                          id: `categories.${category.toUpperCase()}`,
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
                          id: `categories.${category.toUpperCase()}`,
                        })}
                      </Text>
                    ))}
                  </Flex>
                )}
              </Flex>
            </Tabs.Content>
            <Tabs.Content value="date" style={{ paddingTop: "16px" }}>
              <Flex direction="column" gap="3">
                <Text size="2" weight="medium" color="gray">
                  {formatMessage({
                    id: "filters.selectDate",
                    defaultMessage: "Select a date",
                  })}
                </Text>
                <Flex align="center">
                  <Text size="1" color="gray" style={{ marginRight: "8px" }}>
                    {formatMessage({
                      id: "filters.startDate",
                      defaultMessage: "Start Date",
                    })}
                  </Text>
                  <DatePicker selected={startDate} onSelect={setStartDate} />
                </Flex>
                <Flex align="center">
                  <Text size="1" color="gray" style={{ marginRight: "8px" }}>
                    {formatMessage({
                      id: "filters.endDate",
                      defaultMessage: "End Date",
                    })}
                  </Text>
                  <DatePicker selected={endDate} onSelect={setEndDate} />
                </Flex>
              </Flex>
            </Tabs.Content>
          </Tabs.Root>
          <Separator my="3" size="4" />
          <Button onClick={handleApplyFilters}>Apply</Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default TransactionFilters;
