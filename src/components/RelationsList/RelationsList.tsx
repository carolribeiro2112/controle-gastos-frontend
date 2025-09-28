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
    <div>
      <h2>Selecionar usuário</h2>
      {relations.length === 0 ? (
        <p>Nenhuma relação encontrada.</p>
      ) : (
        <Select.Root value={selectedUserId} onValueChange={handleUserSelection}>
          <Select.Trigger placeholder="Selecione um usuário" />
          <Select.Content>
            {relations.map((rel: RelationProps) => (
              <Select.Item key={rel.userId} value={rel.userId}>
                {rel.userLogin}
              </Select.Item>
            ))}
            <Select.Item key={userData.id} value={userData.id}>
              {userData.sub}
            </Select.Item>
          </Select.Content>
        </Select.Root>
      )}
    </div>
  );
}

export default RelationsList;
