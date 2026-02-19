import { LogoHeader } from "../Logo/Logo";
import { useNavigate, useLocation } from "react-router";
import { SidebarContainer, CustomListItem, CustomUl } from "./Sidebar.style";
import LoginService from "../../services/LoginService/LoginService";
import { Settings, ChartPie, LogOutIcon, Wallet } from "lucide-react";
import { useIntl } from "react-intl";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formatMessage } = useIntl();

  const handleLogout = () => {
    LoginService.logout();
    navigate("/");
  };

  return (
    <SidebarContainer>
      <LogoHeader />
      <CustomUl>
        <a onClick={() => navigate("/dashboard")}>
          <CustomListItem isActive={location.pathname === "/dashboard"}>
            <ChartPie size={18} style={{ marginRight: "8px" }} />
            Dashboard
          </CustomListItem>
        </a>
        <a onClick={() => navigate("/transactions")}>
          <CustomListItem isActive={location.pathname === "/transactions"}>
            <Wallet size={18} style={{ marginRight: "8px" }} />
            Transactions
          </CustomListItem>
        </a>
        <a onClick={() => navigate("/settings")}>
          <CustomListItem isActive={location.pathname === "/settings"}>
            <Settings size={18} style={{ marginRight: "8px" }} />
            Settings
          </CustomListItem>
        </a>
        <a onClick={handleLogout}>
          <CustomListItem>
            <LogOutIcon size={18} style={{ marginRight: "8px" }} />
            {formatMessage({ id: "logoutButton" })}
          </CustomListItem>
        </a>
      </CustomUl>
    </SidebarContainer>
  );
};

export default Sidebar;
