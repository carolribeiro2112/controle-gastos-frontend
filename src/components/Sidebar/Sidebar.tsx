import { LogoHeader } from "../Logo/Logo";
import { useNavigate } from "react-router";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside style={{ padding: "32px 0px 32px 32px" }}>
      <LogoHeader />
      <ul>
        <li>
          <a onClick={() => navigate("/dashboard")}>Dashboard</a>
        </li>
        <li>
          <a onClick={() => navigate("/transactions")}>Transactions</a>
        </li>
        <li>
          <a onClick={() => navigate("/settings")}>Settings</a>
        </li>
        <li>
          <a onClick={() => navigate("/logout")}>Logout</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
