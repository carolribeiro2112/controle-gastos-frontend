import { Flex, Heading, Text } from "@radix-ui/themes";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/useAuth";
import { useTransactions } from "../../hooks/useTransactions";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import PieChart from "../../components/Chart/Chart";
import LastTransactionsCard from "../../components/LastTransactionsCard/LastTransactionsCard";
import TotalCards from "../../components/TotalCards/TotalCards";

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

  useEffect(() => {
    if (userRole === "ADMIN" && adminId && !selectedUserId) {
      handleUserSelection(adminId);
    }
  }, [userRole, adminId, selectedUserId, handleUserSelection]);

  if (!isAuthenticated) {
    return (
      <Flex direction="column" align="center" justify="center" gap="4" m="9">
        <Text>{formatMessage({ id: "dashboard.redirectingToLogin" })}</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="4" m="9" mt="0">
      <Header />
      <Heading as="h1" size="8" color="jade" align={"left"}>
        {formatMessage({ id: "dashboard.title" })}
      </Heading>
      <Flex gap="3" style={{ width: "100%" }}>
        <TotalCards />
        <TotalCards />
        <TotalCards />
      </Flex>

      <Flex gap="3" style={{ width: "100%" }}>
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
