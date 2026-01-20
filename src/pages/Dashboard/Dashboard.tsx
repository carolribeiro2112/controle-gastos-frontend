import { Flex, Heading, Text, Button } from "@radix-ui/themes";
import { PlusCircle } from "lucide-react";
import Header from "../../components/Header/Header";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useAuth } from "../../hooks/useAuth";
import { useTransactions } from "../../hooks/useTransactions";
import Styled from "./Dashboard.style";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import PieChart from "../../components/Chart/Chart";
import { useNavigate } from "react-router";
import LastTransactionsCard from "../../components/LastTransactionsCard/LastTransactionsCard";

const Dashboard = () => {
  const { formatMessage } = useIntl();

  const {
    isAuthenticated,
    adminId,
    selectedUserId,
    userRole,
    handleUserSelection,
  } = useAuth();

  // MANTÉM APENAS UM HOOK useTransactions
  const { transactions, loading, error } = useTransactions({
    isAuthenticated,
    selectedUserId,
    userRole,
    initialPage: 0,
    initialPageSize: 5,
  });

  // HOOK separado para dados SEM FILTROS (para gráfico e summary)
  const { transactions: allTransactions } = useTransactions({
    isAuthenticated,
    selectedUserId,
    userRole,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === "ADMIN" && adminId && !selectedUserId) {
      handleUserSelection(adminId);
    }
  }, [userRole, adminId, selectedUserId, handleUserSelection]);

  const isDisabled = userRole === "USER";

  if (!isAuthenticated) {
    return (
      <Flex direction="column" align="center" justify="center" gap="4" m="9">
        <Text>{formatMessage({ id: "dashboard.redirectingToLogin" })}</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" gap="4" m="9" mt="0">
      <Header />
      <Breadcrumb />
      <Heading as="h1" size="8" color="jade" align={"left"}>
        {formatMessage({ id: "dashboard.title" })}
      </Heading>

      <Flex
        direction="column"
        align="center"
        gap="3"
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <Styled.TableHeaderContainer>
          <Heading as="h2" size="6" color="jade">
            {formatMessage({ id: "dashboard.yourTransactions" })}
          </Heading>
          <Button
            disabled={isDisabled}
            style={{ cursor: "pointer" }}
            size={"3"}
            radius="full"
            onClick={() => navigate("/transactions")}
          >
            <PlusCircle size={24} />
            {formatMessage({ id: "createTransactionModal.addTransaction" })}
          </Button>
        </Styled.TableHeaderContainer>

        {loading && (
          <Text>{formatMessage({ id: "dashboard.loadingTransactions" })}</Text>
        )}

        {error && <Text color="red">{error}</Text>}

        <LastTransactionsCard data={transactions} />

        <PieChart
          transactions={allTransactions
            ?.filter((t) => t.type === "EXPENSE")
            .map((t) => ({
              ...t,
              type: t.type === "EXPENSE" ? "EXPENSE" : "INCOME",
            }))}
        />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
