import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoginService from '../services/LoginService/LoginService';
import { getUserIdFromToken, getUserRoleFromToken } from '../utils/getUserData';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const userRole = getUserRoleFromToken();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = LoginService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const id = await getUserIdFromToken();
        setAdminId(id);

        // Se for usuário USER, automaticamente seleciona o próprio ID
        if (userRole === "USER") {
          setSelectedUserId(id);
        }
      } catch (err) {
        console.error("Erro ao buscar adminId:", err);
      }
    };

    if (isAuthenticated) {
      fetchAdminId();
    }
  }, [userRole, isAuthenticated]);

  const handleUserSelection = (userId: string) => {
    setSelectedUserId(userId);
  };

  return {
    isAuthenticated,
    adminId,
    selectedUserId,
    userRole,
    handleUserSelection,
  };
};