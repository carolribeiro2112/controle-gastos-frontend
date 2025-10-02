import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  DataList,
} from "@radix-ui/themes";
import { useState } from "react";
import UserService from "../../services/UserService/UserService";
import RelationService from "../../services/RelationService/RelationService";
import Toast from "../../components/Toast/Toast";
import Header from "../../components/Header/Header";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { getUserIdFromToken } from "../../utils/getUserData";

interface UserData {
  id: string;
  login: string;
  age: number;
}

const SettingsPage = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSearch = async () => {
    if (!userName.trim()) {
      setError("Please enter a username to search");
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await UserService.getUserByName(userName.trim());
      setUserData(response);
      setUserName("");
    } catch (error: unknown) {
      console.error("Error fetching user:", error);

      const errorMessage = "Failed to fetch user. Please try again.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBindUser = async () => {
    if (!userData) return;

    setLoading(true);
    setError(null);

    const relationData = {
      adminId: getUserIdFromToken(),
      userId: userData.id,
    };

    try {
      await RelationService.createRelation(relationData);
      setShowToast(true);
    } catch (error: unknown) {
      console.error("Error binding user:", error);
      const errorMessage = "Falha ao vincular o usuário. Tente novamente.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" align="center" gap="4" m="9" mt="0">
      <Header />
      <Breadcrumb />
      <Heading as="h1" size="8" color="jade">
        Settings
      </Heading>

      <div style={{ marginBottom: "20px", gap: "10px", width: "250px" }}>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Type user name
          </Text>
          <TextField.Root
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter the user name"
            type="text"
            disabled={loading}
            style={{ marginBottom: "10px" }}
          />
        </label>
        <Flex justify="between">
          <Button
            onClick={handleSearch}
            disabled={loading || !userName.trim()}
            style={{ cursor: "pointer" }}
          >
            {loading ? "Searching..." : "Search"}
          </Button>
          <Button
            onClick={handleBindUser}
            disabled={!userData}
            style={{ cursor: "pointer" }}
          >
            Vincular usuário
          </Button>
        </Flex>
      </div>

      {error && <Toast type="error" message={error} duration={2500} />}
      {showToast && (
        <Toast
          type="success"
          message="Usuário vinculado com sucesso!"
          duration={2500}
        />
      )}

      {userData && (
        <DataList.Root
          style={{
            border: "1px solid #f4fefbb0",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <DataList.Item>
            <DataList.Label>ID</DataList.Label>
            <DataList.Value>{userData.id}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Username</DataList.Label>
            <DataList.Value>{userData.login}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Age</DataList.Label>
            <DataList.Value>{userData.age}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      )}
    </Flex>
  );
};

export default SettingsPage;
