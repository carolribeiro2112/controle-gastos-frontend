import { Flex, Heading, Text, IconButton } from "@radix-ui/themes";
import CustomTable from "../../components/CustomTable/Table";
import { ArrowDownLeft, ArrowUpRight, Trash2 } from "lucide-react";
import CreateTransactionModal from "../../components/CreateTransactionModal/CreateTransactionModal";
import Toast from "../../components/Toast/Toast";
import Header from "../../components/Header/Header";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";
import { useAuth } from "../../hooks/useAuth";
import { useTransactions } from "../../hooks/useTransactions";
import { useRelations } from "../../hooks/useRelations";
import { useToast } from "../../hooks/useToast";
import Styled from "./Transactions.style";
import { useEffect, useState, useMemo } from "react";
import Categories from "../../components/Categories/Categories";
import { useIntl } from "react-intl";

const Transactions = () => {
  const { formatMessage } = useIntl();
  const [filters, setFilters] = useState<{
    types?: string[];
    categories?: string[];
  }>({});

  const {
    isAuthenticated,
    adminId,
    selectedUserId,
    userRole,
    handleUserSelection,
  } = useAuth();

  // MANTÉM APENAS UM HOOK useTransactions
  const {
    transactions,
    pagination,
    loading,
    error,
    deleteDialogOpen,
    setDeleteDialogOpen,
    fetchTransactions,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handlePageChange,
    handlePageSizeChange,
  } = useTransactions({
    isAuthenticated,
    selectedUserId,
    userRole,
    type: filters.types,
    category: filters.categories,
    initialPage: 0,
    initialPageSize: 5,
  });

  // HOOK separado para dados SEM FILTROS (para gráfico e summary)
  const {
    transactions: allTransactions,
    fetchTransactions: fetchAllTransactions,
  } = useTransactions({
    isAuthenticated,
    selectedUserId,
    userRole,
  });

  const { relations } = useRelations({ adminId, userRole });
  const { showToast, showSuccessToast } = useToast();

  const handleFiltersChange = (newFilters: {
    types?: string[];
    categories?: string[];
  }) => {
    setFilters(newFilters);
  };

  const handleTransactionChange = async () => {
    await fetchTransactions();
    await fetchAllTransactions();
  };

  const columns = useMemo(
    () => [
      {
        id: "description",
        label: formatMessage({ id: "dashboard.description" }),
        justify: "start" as const,
      },
      {
        id: "value",
        label: formatMessage({ id: "dashboard.value" }),
        justify: "start" as const,
      },
      {
        id: "transactionDate",
        label: formatMessage({ id: "dashboard.date" }),
        justify: "start" as const,
      },
      {
        id: "actions",
        label: formatMessage({ id: "dashboard.actions" }),
        justify: "center" as const,
      },
    ],
    [formatMessage],
  );

  useEffect(() => {
    if (userRole === "ADMIN" && adminId && !selectedUserId) {
      handleUserSelection(adminId);
    }
  }, [userRole, adminId, selectedUserId, handleUserSelection]);

  const handleDeleteWithToast = async () => {
    const result = await handleDeleteConfirm();
    if (result?.success) {
      showSuccessToast();
      await fetchAllTransactions();
    }
  };

  // MEMOIZAR os dados transformados para evitar recalculos desnecessários
  const transformedData = useMemo(() => {
    // Adiciona timestamp para garantir que seja único
    const timestamp = Date.now();

    return transactions.map((transaction, index) => ({
      id: index + 1,
      originalId: transaction.id,
      uniqueKey: `${transaction.id}-${pagination.currentPage}-${timestamp}`, // Chave única
      description: (
        <Flex align="center" gap="2">
          <Categories category={transaction.category} />
          <Text>{transaction.description}</Text>
        </Flex>
      ),
      value: (
        <Text
          color={transaction.type === "INCOME" ? "green" : "red"}
          weight="bold"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          {transaction.type === "EXPENSE" ? (
            <ArrowDownLeft size={16} />
          ) : (
            <ArrowUpRight size={16} />
          )}
          R${transaction.value.toFixed(2)}
        </Text>
      ),
      type: transaction.type,
      category: transaction.category,
      transactionDate: new Date(transaction.transactionDate).toLocaleDateString(
        "pt-BR",
      ),
      actions: (
        <IconButton
          onClick={() => handleDeleteClick(transaction.id)}
          disabled={userRole === "USER"}
          radius="full"
          style={{ cursor: "pointer" }}
        >
          <Trash2 size={16} />
        </IconButton>
      ),
    }));
  }, [
    transactions,
    userRole,
    handleDeleteClick,
    pagination.currentPage,
    pagination.pageSize,
  ]);

  if (!isAuthenticated) {
    return (
      <Flex direction="column" align="center" justify="center" gap="4" m="9">
        <Text>{formatMessage({ id: "dashboard.redirectingToLogin" })}</Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      align="center"
      gap="4"
      p="9"
      mt="0"
      style={{ width: "100%" }}
    >
      <Header />

      <Flex direction="column" align="center" gap="3" style={{ width: "100%" }}>
        <Styled.TableHeaderContainer>
          <Heading as="h2" size="6" color="jade">
            {formatMessage({ id: "dashboard.yourTransactions" })}
          </Heading>
          {userRole === "ADMIN" && (
            <CreateTransactionModal
              onTransactionCreated={handleTransactionChange}
              userId={selectedUserId}
            />
          )}
        </Styled.TableHeaderContainer>

        {loading && (
          <Text>{formatMessage({ id: "dashboard.loadingTransactions" })}</Text>
        )}

        {error && <Text color="red">{error}</Text>}

        <CustomTable
          columns={columns}
          data={transformedData}
          relations={relations}
          handleUserSelection={handleUserSelection}
          userRole={userRole}
          selectedUserId={selectedUserId ?? undefined}
          onFiltersChange={handleFiltersChange}
          showFilters
          originalTransactions={allTransactions}
          pagination={pagination}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />

        {showToast && (
          <Toast
            type="success"
            message={formatMessage({ id: "dashboard.transactionDeleted" })}
            duration={2000}
          />
        )}

        <DeleteDialog
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          handleDeleteCancel={handleDeleteCancel}
          handleDeleteConfirm={handleDeleteWithToast}
        />
      </Flex>
    </Flex>
  );
};

export default Transactions;
