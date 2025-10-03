import { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { getUserData } from "../../utils/getUserData";
import { SelectContainer } from "./RelationSelect.style";

interface Relations {
  relations: RelationProps[];
  onUserSelect?: (userId: string) => void;
  externalSelectedUserId?: string;
}
interface RelationProps {
  adminId: string;
  adminLogin: string;
  userId: string;
  userLogin: string;
}

function RelationsSelect({
  relations,
  onUserSelect,
  externalSelectedUserId,
}: Relations) {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const userData = getUserData();

  useEffect(() => {
    if (externalSelectedUserId) {
      setSelectedUserId(externalSelectedUserId);
    }
  }, [externalSelectedUserId]);

  const handleUserSelection = (userId: string) => {
    setSelectedUserId(userId);
    if (onUserSelect) {
      onUserSelect(userId);
    }
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      {relations.length !== 0 && (
        <SelectContainer>
          <label>Selecione um usuário</label>
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
        </SelectContainer>
      )}
    </div>
  );
}

export default RelationsSelect;
