import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { ArrowUpCircleIcon } from "lucide-react";

const TotalCards = () => {
  return (
    <Box width="100%">
      <Card size="3">
        <Flex align="center" gap="4">
          <ArrowUpCircleIcon />
          <Flex direction="column">
            <Text as="p">Total Income</Text>
            <Text as="p" size="6">
              R$ 0.00
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};
export default TotalCards;
