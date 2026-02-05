import { LogoHeader } from "../Logo/Logo";

const Sidebar = () => {
  return (
    <aside style={{ padding: "32px 0px 32px 32px" }}>
      <LogoHeader />
      <ul>
        <li>Dashboard</li>
        <li>Transactions</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
