import { Flex, Heading, Text } from "@radix-ui/themes";
import { BanknoteX } from "lucide-react";
import { useIntl } from "react-intl";

const EmptyState = () => {
  const { formatMessage } = useIntl();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      width={"100%"}
      p={"4"}
    >
      <BanknoteX size={64} />
      <Heading m={"2"}>{formatMessage({ id: "emptyState.title" })}</Heading>
      <Text className="text-gray-600">
        {formatMessage({ id: "emptyState.message" })}
      </Text>
    </Flex>
  );
};

export default EmptyState;
