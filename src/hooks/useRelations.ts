import { useState, useEffect } from 'react';
import RelationService from '../services/RelationService/RelationService';

interface Relation {
  adminId: string;
  adminLogin: string;
  userId: string;
  userLogin: string;
}

interface UseRelationsProps {
  adminId: string | null;
  userRole: string;
}

export const useRelations = ({ adminId, userRole }: UseRelationsProps) => {
  const [relations, setRelations] = useState<Relation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelations = async () => {
      // Apenas usuários ADMIN podem buscar relações
      if (!adminId || userRole !== "ADMIN") return;

      try {
        const data = await RelationService.getRelationsByAdminId(adminId);
        setRelations(data);
      } catch (err) {
        setError((err as Error).message || "Erro ao buscar relações");
      }
    };

    if (adminId && userRole === "ADMIN") {
      fetchRelations();
    }
  }, [adminId, userRole]);

  return {
    relations,
    error,
  };
};