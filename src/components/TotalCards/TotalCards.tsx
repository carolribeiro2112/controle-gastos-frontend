import { Box, Card, Flex, Text } from "@radix-ui/themes";

interface TotalCardsProps {
  icon?: React.ReactNode;
  title?: string;
  amount?: number;
}

const TotalCards = ({ icon, title, amount }: TotalCardsProps) => {
  return (
    <Box width="100%">
      <Card size="3">
        <Flex align="center" gap="4">
          {icon}
          <Flex direction="column">
            <Text as="p">{title}</Text>
            <Text as="p" size="6">
              R$ {amount?.toFixed(2)}
            </Text>
            {(title === "Net Balance" || title === "Total Expenses") && (
              <Text as="p" size="2" color="gray">
                vs last month
              </Text>
            )}
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};
export default TotalCards;
