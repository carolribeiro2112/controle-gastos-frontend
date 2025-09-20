import { Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import UserService from "../../services/UserService/UserService";
import RelationService from "../../services/RelationService/RelationService";
import Toast from "../../components/Toast/Toast";
import Header from "../../components/Header/Header";

interface UserData {
  id: string;
  login: string;
  email?: string;
}

const SettingsPage = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  console.log("User Data:", userData);

  const handleBindUser = async () => {
    if (!userData) return;

    setLoading(true);
    setError(null);

    try {
      await RelationService.createRelation(userData.id);
      alert("Usuário vinculado com sucesso!");
    } catch (error: unknown) {
      console.error("Error binding user:", error);
      const errorMessage = "Failed to bind user. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" align="center" gap="4" m="9" mt="0">
      <Header />
      <Heading as="h1" size="8" color="jade">
        Settings
      </Heading>

      <div style={{ marginBottom: "20px" }}>
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
        <Button onClick={handleSearch} disabled={loading || !userName.trim()}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {error && <Toast type="error" message={error} duration={2500} />}

      {userData && (
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          }}
        >
          <h2
            style={{ marginTop: "0", marginBottom: "16px", color: "#374151" }}
          >
            User Details
          </h2>
          <div style={{ display: "grid", gap: "12px" }}>
            <div
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #f3f4f6",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text weight="bold" style={{ color: "#6b7280" }}>
                ID:
              </Text>
              <Text style={{ color: "#111827" }}>{userData.id}</Text>
            </div>
            <div
              style={{
                padding: "8px 0",
                borderBottom: "1px solid #f3f4f6",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text weight="bold" style={{ color: "#6b7280" }}>
                Username:
              </Text>
              <Text style={{ color: "#111827" }}>{userData.login}</Text>
            </div>
            {userData.email && (
              <div
                style={{
                  padding: "8px 0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Text weight="bold" style={{ color: "#6b7280" }}>
                  Email:
                </Text>
                <Text style={{ color: "#111827" }}>{userData.email}</Text>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <Button onClick={handleBindUser} disabled={!userData}>
          Vincular usuário
        </Button>
      </div>
    </Flex>
  );
};

export default SettingsPage;
