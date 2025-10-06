import { Flex, Heading, Text, IconButton } from "@radix-ui/themes";
import CustomTable from "../../components/CustomTable/Table";
import { ArrowDownLeft, ArrowUpRight, Trash2 } from "lucide-react";
import CreateTransactionModal from "../../components/CreateTransactionModal/CreateTransactionModal";
import Toast from "../../components/Toast/Toast";
import Header from "../../components/Header/Header";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useAuth } from "../../hooks/useAuth";
import { useTransactions } from "../../hooks/useTransactions";
import { useRelations } from "../../hooks/useRelations";
import { useToast } from "../../hooks/useToast";
import Styled from "./Dashboard.style";
import { useEffect } from "react";
import Categories from "../../components/Categories/Categories";

const Dashboard = () => {
  const {
    isAuthenticated,
    adminId,
    selectedUserId,
    userRole,
    handleUserSelection,
  } = useAuth();
  const {
    transactions,
    loading,
    error,
    deleteDialogOpen,
    setDeleteDialogOpen,
    fetchTransactions,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useTransactions({ isAuthenticated, selectedUserId, userRole });
  const { relations } = useRelations({ adminId, userRole });
  const { showToast, showSuccessToast } = useToast();

  const columns: {
    id: string;
    label: string;
    justify: "center" | "start" | "end";
  }[] = [
    { id: "description", label: "Description", justify: "start" },
    { id: "value", label: "Value", justify: "start" },
    { id: "transactionDate", label: "Date", justify: "start" },
    { id: "actions", label: "Actions", justify: "center" },
  ];

  useEffect(() => {
    if (userRole === "ADMIN" && adminId && !selectedUserId) {
      handleUserSelection(adminId);
    }
  }, [userRole, adminId, selectedUserId, handleUserSelection]);

  const handleDeleteWithToast = async () => {
    const result = await handleDeleteConfirm();
    if (result?.success) {
      showSuccessToast();
    }
  };

  const transformedData = transactions.map((transaction, index) => ({
    id: index + 1,
    originalId: transaction.id,
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
      "pt-BR"
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

  if (!isAuthenticated) {
    return (
      <Flex direction="column" align="center" justify="center" gap="4" m="9">
        <Text>Redirecionando para login...</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" gap="4" m="9" mt="0">
      <Header />
      <Breadcrumb />
      <Heading as="h1" size="8" color="jade" align={"left"}>
        Dashboard - Controle de Gastos
      </Heading>

      <Flex
        direction="column"
        align="center"
        gap="3"
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <Styled.TableHeaderContainer>
          <Heading as="h2" size="6" color="jade">
            Suas transações
          </Heading>
          {userRole === "ADMIN" && (
            <CreateTransactionModal
              onTransactionCreated={fetchTransactions}
              userId={selectedUserId}
            />
          )}
        </Styled.TableHeaderContainer>

        {loading && <Text>Loading transactions...</Text>}

        {error && <Text color="red">{error}</Text>}

        <CustomTable
          columns={columns}
          data={transformedData}
          relations={relations}
          handleUserSelection={handleUserSelection}
          userRole={userRole}
          selectedUserId={selectedUserId ?? undefined}
        />

        {showToast && (
          <Toast
            type="success"
            message="Your transaction has been successfully deleted."
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

export default Dashboard;
