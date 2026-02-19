import { LogoHeader } from "../Logo/Logo";
import { useNavigate } from "react-router";
import { SidebarContainer, CustomListItem, CustomUl } from "./Sidebar.style";
import LoginService from "../../services/LoginService/LoginService";
import { Settings, ChartPie, LogOutIcon, Wallet } from "lucide-react";
const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    LoginService.logout();
    navigate("/");
  };

  return (
    <SidebarContainer>
      <LogoHeader />
      <CustomUl>
        <CustomListItem>
          <a onClick={() => navigate("/dashboard")}>
            <ChartPie size={18} style={{ marginRight: "8px" }} />
            Dashboard
          </a>
        </CustomListItem>
        <CustomListItem>
          <a onClick={() => navigate("/transactions")}>
            <Wallet size={18} style={{ marginRight: "8px" }} />
            Transactions
          </a>
        </CustomListItem>
        <CustomListItem>
          <a onClick={() => navigate("/settings")}>
            <Settings size={18} style={{ marginRight: "8px" }} />
            Settings
          </a>
        </CustomListItem>
        <CustomListItem>
          <a onClick={handleLogout}>
            <LogOutIcon size={18} style={{ marginRight: "8px" }} />
            Logout
          </a>
        </CustomListItem>
      </CustomUl>
    </SidebarContainer>
  );
};

export default Sidebar;
