import { Flex, Heading, Text } from "@radix-ui/themes";
import { BanknoteX } from "lucide-react";

const EmptyState = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      width={"100%"}
      p={"4"}
    >
      <BanknoteX size={64} />
      <Heading m={"2"}>No Data Available</Heading>
      <Text className="text-gray-600">
        There is currently no data to display. Please check back later or add
        new data.
      </Text>
    </Flex>
  );
};

export default EmptyState;
