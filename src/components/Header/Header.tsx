import { Flex } from "@radix-ui/themes";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

const Header = () => {
  return (
    <Flex
      direction="row"
      width="100%"
      justify="between"
      align="center"
      pt="6"
      pb="4"
    >
      <Breadcrumb />
    </Flex>
  );
};

export default Header;
