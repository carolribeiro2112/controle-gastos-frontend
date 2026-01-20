import { Card, Text, Box, Flex, Heading, Button } from "@radix-ui/themes";
import Categories from "../Categories/Categories";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { TransactionResponse } from "../../services/TransactionService/TransactionService";
import { useNavigate } from "react-router";

interface LastTransactionsCardProps {
  data: TransactionResponse[];
}
const LastTransactionsCard = ({ data }: LastTransactionsCardProps) => {
  const navigate = useNavigate();
  return (
    <Card size="3">
      <Heading style={{ marginBottom: "16px" }}>Recent Transactions</Heading>
      {data?.map((transaction) => (
        <Flex gap="9" align="center" mt="2" key={transaction.id}>
          <Box>
            <Flex align="center" gap="2">
              <Categories category={transaction.category} />
              <Text size="3" weight="bold">
                {transaction.description}
              </Text>
            </Flex>
            <Text as="p" size="2" color="gray">
              {new Date(transaction.transactionDate).toLocaleDateString(
                "pt-BR"
              )}
            </Text>
          </Box>
          <Flex align="center" justify="end" style={{ flex: 1 }}>
            <Text
              size="3"
              as="div"
              color={transaction.type === "INCOME" ? "green" : "red"}
              weight="bold"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {transaction.type === "EXPENSE" ? <Text> - </Text> : null}
              R${transaction.value.toFixed(2)}
              {transaction.type === "EXPENSE" ? (
                <ArrowDownRight size={16} />
              ) : (
                <ArrowUpRight size={16} />
              )}
            </Text>
          </Flex>
        </Flex>
      ))}
      <Flex justify="center" mt="4">
        <Button
          style={{ width: "100%", cursor: "pointer" }}
          radius="full"
          onClick={() => navigate("/transactions")}
        >
          View All Transactions
        </Button>
      </Flex>
    </Card>
  );
};

export default LastTransactionsCard;
