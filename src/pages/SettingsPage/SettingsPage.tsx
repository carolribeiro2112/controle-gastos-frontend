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
import { getUserIdFromToken } from "../../utils/getUserData";
import { useIntl } from "react-intl";

interface UserData {
  id: string;
  login: string;
  age: number;
}

const SettingsPage = () => {
  const { formatMessage } = useIntl();
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSearch = async () => {
    if (!userName.trim()) {
      setError(formatMessage({ id: "settings.usernameSearchPrompt" }));
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
      console.error(
        formatMessage({ id: "settings.fetchUserErrorPrefix" }),
        error,
      );

      const errorMessage = formatMessage({ id: "settings.fetchUserError" });

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
      console.error(
        formatMessage({ id: "settings.bindUserErrorPrefix" }),
        error,
      );
      const errorMessage = formatMessage({ id: "settings.bindUserError" });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      gap="4"
      p="9"
      mt="0"
      style={{ width: "100%", height: "100vh" }}
    >
      <Header />
      <Heading as="h1" size="8" color="jade">
        {formatMessage({ id: "settings.title" })}
      </Heading>

      <div
        style={{
          marginBottom: "20px",
          gap: "10px",
          width: "250px",
          marginTop: "16px",
        }}
      >
        <label>
          <Text as="div" size="2" mb="2" weight="bold">
            {formatMessage({ id: "settings.typeUsername" })}
          </Text>
          <TextField.Root
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder={formatMessage({ id: "settings.enterUsername" })}
            type="text"
            disabled={loading}
            size={"3"}
          />
        </label>
        <Flex justify="between" mt={"4"}>
          <Button
            onClick={handleSearch}
            disabled={loading || !userName.trim()}
            style={{ cursor: "pointer" }}
            size={"3"}
            radius="large"
          >
            {loading
              ? formatMessage({ id: "settings.searching" })
              : formatMessage({ id: "settings.searchButton" })}
          </Button>
          <Button
            onClick={handleBindUser}
            disabled={!userData}
            style={{ cursor: "pointer" }}
            size={"3"}
            radius="large"
          >
            {formatMessage({ id: "settings.bindUserButton" })}
          </Button>
        </Flex>
      </div>

      {error && <Toast type="error" message={error} duration={2500} />}
      {showToast && (
        <Toast
          type="success"
          message={formatMessage({ id: "settings.bindUserSuccess" })}
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
            <DataList.Label>
              {formatMessage({ id: "settings.id" })}
            </DataList.Label>
            <DataList.Value>{userData.id}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
              {formatMessage({ id: "settings.username" })}
            </DataList.Label>
            <DataList.Value>{userData.login}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>
              {formatMessage({ id: "settings.age" })}
            </DataList.Label>
            <DataList.Value>{userData.age}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      )}
    </Flex>
  );
};

export default SettingsPage;
