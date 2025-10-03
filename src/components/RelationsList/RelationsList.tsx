import { useState } from "react";
import { Select } from "@radix-ui/themes";
import { getUserData } from "../../utils/getUserData";

interface Relations {
  relations: RelationProps[];
  onUserSelect?: (userId: string) => void;
}
interface RelationProps {
  adminId: string;
  adminLogin: string;
  userId: string;
  userLogin: string;
}

function RelationsList({ relations, onUserSelect }: Relations) {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const userData = getUserData();

  const handleUserSelection = (userId: string) => {
    setSelectedUserId(userId);
    if (onUserSelect) {
      onUserSelect(userId);
    }
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      {relations.length !== 0 && (
        <Select.Root
          value={selectedUserId}
          onValueChange={handleUserSelection}
          size={"3"}
        >
          <Select.Trigger placeholder="Selecione um usuário" radius="full" />
          <Select.Content style={{ overflowY: "auto" }} position="popper">
            <Select.Item key={userData.id} value={userData.id}>
              {userData.sub}
            </Select.Item>
            {relations.map((rel: RelationProps) => (
              <Select.Item key={rel.userId} value={rel.userId}>
                {rel.userLogin}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      )}
    </div>
  );
}

export default RelationsList;
