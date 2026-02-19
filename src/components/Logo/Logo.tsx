import { Flex, Heading, Text } from "@radix-ui/themes";
import { CircleDollarSign } from "lucide-react";

const LogoHeader = () => {
  return (
    <Flex align="center" mb="4">
      <Heading
        as="h2"
        size="8"
        color="jade"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <CircleDollarSign size={32} />
        Fintrack
      </Heading>
    </Flex>
  );
};

const LogoLandingPage = () => {
  return (
    <Flex align="center">
      <Heading
        as="h2"
        size="8"
        color="jade"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <CircleDollarSign size={50} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Text>Fintrack</Text>
          <Text size="3" color="gray">
            Track your finances
          </Text>
        </div>
      </Heading>
    </Flex>
  );
};

export { LogoHeader, LogoLandingPage };
