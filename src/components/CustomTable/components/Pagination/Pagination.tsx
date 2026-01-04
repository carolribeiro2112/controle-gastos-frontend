import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import type { PaginationData } from "../../../../hooks/useTransactions";

interface PaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Pagination = ({
  pagination,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const handlePreviousPage = () => {
    if ((pagination.currentPage ?? 0) > 0) {
      const newPage = (pagination.currentPage ?? 0) - 1;
      onPageChange(newPage);
    }
  };

  const handleNextPage = () => {
    if ((pagination.currentPage ?? 0) < (pagination.totalPages || 0) - 1) {
      const newPage = (pagination.currentPage ?? 0) + 1;
      onPageChange(newPage);
    }
  };

  const handlePageSizeChange = (newSize: string) => {
    onPageSizeChange(parseInt(newSize));
  };

  const totalElements = pagination.totalElements || 0;
  const totalPages = pagination.totalPages || 0;
  const currentPage = pagination.currentPage || 0;
  const pageSize = pagination.pageSize ?? 5; // Default to 5 if undefined

  const startItem = totalElements > 0 ? currentPage * pageSize + 1 : 0;
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

  // Debug dos botões
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1 && totalPages > 0;

  return (
    <Flex
      justify="between"
      align="center"
      style={{ marginTop: "16px", padding: "8px" }}
    >
      <Flex align="center" gap="2">
        <Text size="2">Itens por página:</Text>
        <Select.Root
          value={pageSize.toString()}
          onValueChange={handlePageSizeChange}
        >
          <Select.Trigger style={{ width: "70px" }} />
          <Select.Content>
            <Select.Item value="5">5</Select.Item>
            <Select.Item value="10">10</Select.Item>
            <Select.Item value="20">20</Select.Item>
            <Select.Item value="50">50</Select.Item>
            <Select.Item value="100">100</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>

      <Text size="2" color="gray">
        {totalElements > 0
          ? `${startItem}-${endItem} de ${totalElements} itens`
          : "0 itens"}
      </Text>

      <Flex align="center" gap="2">
        <Button
          variant="soft"
          size="2"
          onClick={handlePreviousPage}
          disabled={!canGoPrevious}
        >
          <ChevronLeftIcon />
        </Button>

        <Text size="2">
          Página {currentPage + 1} de {Math.max(1, totalPages)}
        </Text>

        <Button
          variant="soft"
          size="2"
          onClick={handleNextPage}
          disabled={!canGoNext}
        >
          <ChevronRightIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
