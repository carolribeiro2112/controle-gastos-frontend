import { Button } from "@radix-ui/themes";
import LoginService from "../../services/LoginService";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigation = useNavigate();
  const handleLogout = () => {
    LoginService.logout();
    navigation("/");
  };
  return (
    <div>
      <h1>Dashboard page</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
