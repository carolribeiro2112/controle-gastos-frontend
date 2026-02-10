import { Flex, Heading, Text } from "@radix-ui/themes";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/useAuth";
import { useTransactions } from "../../hooks/useTransactions";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import PieChart from "../../components/Chart/Chart";
import LastTransactionsCard from "../../components/LastTransactionsCard/LastTransactionsCard";
import TotalCards from "../../components/TotalCards/TotalCards";
import { BanknoteArrowDown, BanknoteArrowUp, Wallet } from "lucide-react";

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

  const totalIncome = allTransactions
    .filter((item) => item && item.type === "INCOME")
    .reduce((sum, item) => {
      const value = Number(item.value) || 0;
      return sum + value;
    }, 0);

  const totalExpenses = allTransactions
    .filter((item) => item && item.type === "EXPENSE")
    .reduce((sum, item) => {
      const value = Number(item.value) || 0;
      return sum + Math.abs(value);
    }, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <Flex direction="column" gap="4" m="9" mt="0" width="100%">
      <Header />
      <Heading as="h1" size="8" color="jade" align={"left"}>
        {formatMessage({ id: "dashboard.title" })}
      </Heading>
      <Flex gap="3" style={{ width: "100%" }}>
        <TotalCards
          icon={<BanknoteArrowUp color="#299764" size={35} />}
          title="Total Income" //Renda total
          amount={totalIncome}
        />
        <TotalCards
          icon={<BanknoteArrowDown color="#c45050" size={35} />}
          title="Total Expenses" //Despesas totais
          amount={totalExpenses}
        />
        <TotalCards
          icon={<Wallet color="#3a5ccc" size={35} />}
          title="Net Balance" //Saldo disponível
          amount={balance}
        />
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
