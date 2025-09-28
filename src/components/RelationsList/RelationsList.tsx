import { useState } from "react";
import { Select } from "@radix-ui/themes";
import { getUserData } from "../../utils/getUserData";

interface Relations {
  relations: RelationProps[];
}
interface RelationProps {
  adminId: string;
  adminLogin: string;
  userId: string;
  userLogin: string;
}

function RelationsList(relations: Relations) {
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const userData = getUserData();

  return (
    <div>
      <h2>Selecionar usuário</h2>
      {relations.relations.length === 0 ? (
        <p>Nenhuma relação encontrada.</p>
      ) : (
        <Select.Root value={selectedUserId} onValueChange={setSelectedUserId}>
          <Select.Trigger placeholder="Selecione um usuário" />
          <Select.Content>
            {relations.relations.map((rel: RelationProps) => (
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
