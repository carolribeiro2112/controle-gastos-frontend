import { AlertDialog, Button, Flex, Heading, Text } from "@radix-ui/themes";
import LoginService from "../../services/LoginService/LoginService";
import TransactionService, {
  type TransactionResponse,
} from "../../services/TransactionService/TransactionService";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable/Table";
import { getUserIdFromToken } from "../../utils/getUserData";
import { Trash2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null
  );

  const columns = [
    { id: "description", label: "Description" },
    { id: "value", label: "Value" },
    { id: "type", label: "Type" },
    { id: "transactionDate", label: "Date" },
    { id: "actions", label: "Actions" },
  ];

  const handleDeleteClick = (transactionId: string) => {
    setTransactionToDelete(transactionId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!transactionToDelete) return;

    try {
      setError(null);

      await TransactionService.deleteTransaction(transactionToDelete);

      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) => transaction.id !== transactionToDelete
        )
      );

      console.log("Transaction deleted successfully");
    } catch (err) {
      console.error("Error deleting transaction:", err);
      setError("Failed to delete transaction");
    } finally {
      setDeleteDialogOpen(false);
      setTransactionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  const transformedData = transactions.map((transaction, index) => ({
    id: index + 1,
    originalId: transaction.id,
    description: transaction.description,
    value: `R$${transaction.value.toFixed(2)}`,
    type: transaction.type,
    transactionDate: new Date(transaction.transactionDate).toLocaleDateString(),
    actions: (
      <Trash2
        size={16}
        style={{ cursor: "pointer", color: "#ef4444" }}
        onClick={() => handleDeleteClick(transaction.id)}
      />
    ),
  }));

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = LoginService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        setError(null);

        const userId = getUserIdFromToken();

        const data = await TransactionService.getTransactions(userId);
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [isAuthenticated]);

  const handleLogout = () => {
    LoginService.logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <Flex direction="column" align="center" justify="center" gap="4" m="9">
        <Text>Redirecionando para login...</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" gap="4" m="9">
      <Heading as="h1" size="8" color="jade">
        Dashboard - Controle de Gastos
      </Heading>

      <Text size="4" color="gray">
        Bem-vindo! Você está autenticado e pode acessar o dashboard.
      </Text>

      <Text size="2" color="gray">
        Token JWT presente: ✅
      </Text>

      <Button
        size="3"
        color="red"
        variant="outline"
        onClick={handleLogout}
        style={{ marginTop: "20px" }}
      >
        Logout
      </Button>

      <Flex
        direction="column"
        align="center"
        gap="3"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <Heading as="h2" size="6" color="jade">
          Your Transactions
        </Heading>

        {loading && <Text>Loading transactions...</Text>}

        {error && <Text color="red">{error}</Text>}

        {!loading && !error && transactions.length === 0 && (
          <Text color="gray">No transactions found.</Text>
        )}

        {!loading && !error && transactions.length > 0 && (
          <CustomTable columns={columns} data={transformedData} />
        )}

        <AlertDialog.Root
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        >
          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Delete transaction</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Are you sure you want to delete this transaction? This action
              cannot be undone.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button
                  variant="soft"
                  color="gray"
                  onClick={handleDeleteCancel}
                >
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button
                  variant="solid"
                  color="red"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
