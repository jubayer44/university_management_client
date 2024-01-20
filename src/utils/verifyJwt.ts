import { jwtDecode } from "jwt-decode";

export const verifyJwt = (token: string) => {
  return jwtDecode(token);
};
