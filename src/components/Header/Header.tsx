import { Button, Flex, IconButton } from "@radix-ui/themes";
import LoginService from "../../services/LoginService/LoginService";
import { useNavigate } from "react-router";
import { Settings } from "lucide-react";
import { LogoHeader } from "../Logo/Logo";
import { getUserRoleFromToken } from "../../utils/getUserData";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    LoginService.logout();
    navigate("/");
  };

  const userRole = getUserRoleFromToken();

  return (
    <Flex
      direction="row"
      width="100%"
      justify="between"
      align="center"
      pt="6"
      pb="4"
    >
      <LogoHeader />
      <Flex justify="between" width="140px">
        {userRole === "ADMIN" && (
          <IconButton
            size="3"
            onClick={() => navigate("/settings")}
            variant="outline"
            style={{ cursor: "pointer" }}
          >
            <Settings size={24} />
          </IconButton>
        )}
        <Button
          size="3"
          color="red"
          variant="outline"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
