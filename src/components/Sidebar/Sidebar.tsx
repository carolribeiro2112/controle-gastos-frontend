import { LogoHeader } from "../Logo/Logo";
import { useNavigate } from "react-router";
import { SidebarContainer, CustomListItem, CustomUl } from "./Sidebar.style";
import LoginService from "../../services/LoginService/LoginService";
import { Settings, ChartPie, LogOutIcon, Wallet } from "lucide-react";
import { useIntl } from "react-intl";
const Sidebar = () => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const handleLogout = () => {
    LoginService.logout();
    navigate("/");
  };

  return (
    <SidebarContainer>
      <LogoHeader />
      <CustomUl>
        <CustomListItem>
          <ChartPie size={18} style={{ marginRight: "8px" }} />
          <a onClick={() => navigate("/dashboard")}>Dashboard</a>
        </CustomListItem>
        <CustomListItem>
          <Wallet size={18} style={{ marginRight: "8px" }} />
          <a onClick={() => navigate("/transactions")}>Transactions</a>
        </CustomListItem>
        <CustomListItem>
          <Settings size={18} style={{ marginRight: "8px" }} />
          <a onClick={() => navigate("/settings")}>Settings</a>
        </CustomListItem>
        <CustomListItem>
          <LogOutIcon size={18} style={{ marginRight: "8px" }} />
          <a onClick={handleLogout}>{formatMessage({ id: "logoutButton" })}</a>
        </CustomListItem>
      </CustomUl>
    </SidebarContainer>
  );
};

export default Sidebar;
