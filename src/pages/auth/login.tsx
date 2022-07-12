import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useAuth } from "../../contexts/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { login } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email, password).then(() => {
      const { next } = router.query;
      router.push(next?.toString() || "/");
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {/* {error && <p>{error.message}</p>} */}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {/* {loading && <p>Loading...</p>} */}
    </>
  );
};

export default Login;
