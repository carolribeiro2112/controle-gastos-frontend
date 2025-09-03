/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import LoginService from "../services/LoginService/LoginService";

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

export { getUserData, getUserIdFromToken };