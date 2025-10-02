import { Flex, Heading, Text, IconButton } from "@radix-ui/themes";
import CustomTable from "../../components/CustomTable/Table";
import { Trash2 } from "lucide-react";
import CreateTransactionModal from "../../components/CreateTransactionModal/CreateTransactionModal";
import Toast from "../../components/Toast/Toast";
import Header from "../../components/Header/Header";
import RelationsList from "../../components/RelationsList/RelationsList";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

// Importando os hooks customizados
import { useAuth } from "../../hooks/useAuth";
import { useTransactions } from "../../hooks/useTransactions";
import { useRelations } from "../../hooks/useRelations";
import { useToast } from "../../hooks/useToast";

const Dashboard = () => {
  // Usando os hooks customizados
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
    { id: "type", label: "Type", justify: "start" },
    { id: "transactionDate", label: "Date", justify: "start" },
    { id: "actions", label: "Actions", justify: "center" },
  ];

  // Handler para confirmação de delete com toast
  const handleDeleteWithToast = async () => {
    const result = await handleDeleteConfirm();
    if (result?.success) {
      showSuccessToast();
    }
  };

  const transformedData = transactions.map((transaction, index) => ({
    id: index + 1,
    originalId: transaction.id,
    description: transaction.description,
    value: `R$${transaction.value.toFixed(2)}`,
    type: transaction.type,
    transactionDate: new Date(transaction.transactionDate).toLocaleDateString(),
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
      <Heading as="h1" size="8" color="jade">
        Dashboard - Controle de Gastos
      </Heading>

      <Text size="4" color="gray">
        Bem-vindo! Você está autenticado e pode acessar o dashboard.
      </Text>

      <Text size="2" color="gray">
        Token JWT presente: ✅
      </Text>

      <Flex
        direction="column"
        align="center"
        gap="3"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <Heading as="h2" size="6" color="jade">
          Suas transações
        </Heading>

        {userRole === "ADMIN" && (
          <>
            <RelationsList
              relations={relations}
              onUserSelect={handleUserSelection}
            />
            <CreateTransactionModal
              onTransactionCreated={fetchTransactions}
              userId={selectedUserId}
            />
          </>
        )}

        {loading && <Text>Loading transactions...</Text>}

        {error && <Text color="red">{error}</Text>}

        {!loading && !error && transactions.length === 0 && (
          <Text color="gray">No transactions found.</Text>
        )}

        {!loading && !error && transactions.length > 0 && (
          <CustomTable columns={columns} data={transformedData} />
        )}

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
