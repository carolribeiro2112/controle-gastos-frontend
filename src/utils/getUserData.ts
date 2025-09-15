/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import LoginService from "../services/LoginService/LoginService";
import RelationService from "../services/RelationService/RelationService";

const getUserData = () => {
  const token = LoginService.getToken();
  if (token) {
    const decoded: any = jwtDecode(token);
    return decoded;
  }
  return null;
};

const getUserIdFromToken = () => {
  const userData = getUserData();
  return userData ? userData.id : null;
};

const getUserRoleFromToken = () => {
  const userData = getUserData();
  return userData ? userData.role : null;
};

const getAdminId = () => {
  const relations = RelationService.getRelations();
  const adminId = relations.then((data) => data[0]?.adminId);
  return adminId;
};

export { getUserData, getUserIdFromToken, getAdminId, getUserRoleFromToken };