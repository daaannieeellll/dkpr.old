import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../contexts/auth";

const Logout = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout().then(() => {
      router.push("/");
    });
  });
};

export default Logout;
