import { use } from "react";
import { AuthContext } from "../Provider/AuthContext";

const useAuth = () => {
  const auth = use(AuthContext);
  console.log(auth)
  return auth;
};
export default useAuth;
