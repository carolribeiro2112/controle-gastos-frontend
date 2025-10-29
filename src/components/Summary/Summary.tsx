import { Card, Flex, Text } from "@radix-ui/themes";
import { DollarSign } from "lucide-react";

interface Transaction {
  id: string;
  value: number;
  category: string;
  description?: string;
  transactionDate: string;
  type: "INCOME" | "EXPENSE";
}

interface SummaryProps {
  data: Transaction[];
}

const Summary = ({ data }: SummaryProps) => {
  const totalIncome = data
    .filter((item) => item && item.type === "INCOME")
    .reduce((sum, item) => {
      const value = Number(item.value) || 0;
      return sum + value;
    }, 0);

  const totalExpenses = data
    .filter((item) => item && item.type === "EXPENSE")
    .reduce((sum, item) => {
      const value = Number(item.value) || 0;
      return sum + Math.abs(value);
    }, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "250px",
        height: "80px",
        marginBottom: "16px",
      }}
    >
      <Flex align="center" gap="8px" justify="center" direction="column">
        <Flex>
          <DollarSign size={20} color={balance >= 0 ? "green" : "red"} />
          <Text as="p" size="3" weight="medium">
            Saldo
          </Text>
        </Flex>
        <Text
          as="p"
          size="4"
          weight="bold"
          color={balance >= 0 ? "green" : "red"}
        >
          R$ {balance.toFixed(2)}
        </Text>
      </Flex>
    </Card>
  );
};

export default Summary;
