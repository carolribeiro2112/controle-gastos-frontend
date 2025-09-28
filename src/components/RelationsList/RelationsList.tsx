/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import RelationService from "../../services/RelationService/RelationService";
import { Select } from "@radix-ui/themes";

interface AdminRelationsProps {
  adminId: string;
  onUserSelected?: (userId: string, userLogin: string) => void;
}

interface Relation {
  adminId: string;
  adminLogin: string;
  userId: string;
  userLogin: string;
}

function RelationsList({ adminId }: AdminRelationsProps) {
  const [relations, setRelations] = useState<Relation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  useEffect(() => {
    const fetchRelations = async () => {
      try {
        const data = await RelationService.getRelationsByAdminId(adminId);
        setRelations(data);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar relações");
      }
    };

    if (adminId) {
      fetchRelations();
    }
  }, [adminId]);

  if (error) return <p>Erro: {error}</p>;

  console.log("Relations:", relations);
  console.log("Selected User ID:", selectedUserId);

  return (
    <div>
      <h2>Relações do Admin</h2>
      {relations.length === 0 ? (
        <p>Nenhuma relação encontrada.</p>
      ) : (
        <Select.Root value={selectedUserId} onValueChange={setSelectedUserId}>
          <Select.Trigger placeholder="Selecione um usuário" />
          <Select.Content>
            {relations.map((rel) => (
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
