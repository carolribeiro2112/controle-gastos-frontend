/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import RelationService from "../../services/RelationService/RelationService";

interface AdminRelationsProps {
  adminId: string;
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

  return (
    <div>
      <h2>Relações do Admin</h2>
      {relations.length === 0 ? (
        <p>Nenhuma relação encontrada.</p>
      ) : (
        <ul>
          {relations.map((rel) => (
            <li key={rel.userId}>
              {rel.adminLogin} → {rel.userLogin}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RelationsList;
