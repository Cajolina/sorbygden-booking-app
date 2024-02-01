import { PropsWithChildren, useState, createContext, useContext } from "react";
import { loginContext, Admin, Credentials } from "../Interfaces";

const LoginContext = createContext<loginContext>({
  loggedInAdmin: null,
  loginAdmin: async () => Promise.resolve(),
  logoutAdmin: () => Promise.resolve(),
  authorizeAdmin: () => Promise.resolve(),
});

export const useLoginContext = () => useContext(LoginContext);

const LoginProvider = ({ children }: PropsWithChildren<object>) => {
  const [loggedInAdmin, setLoggedInAdmin] = useState<Admin | null>(null);

  async function authorizeAdmin() {
    try {
      const response = await fetch("/api/admin/authorize");
      if (response.status === 200) {
        const data = await response.json();
        setLoggedInAdmin(data);
      } else {
        setLoggedInAdmin(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loginAdmin(admin: Credentials): Promise<void> {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });
      const data = await response.json();
      if (response.status === 200) {
        setLoggedInAdmin(data);
      }
      if (response.status === 401) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function logoutAdmin() {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (response.status === 204) {
        setLoggedInAdmin(null);
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <LoginContext.Provider
        value={{
          loggedInAdmin,
          loginAdmin,
          logoutAdmin,
          authorizeAdmin,
        }}
      >
        {children}
      </LoginContext.Provider>
    </div>
  );
};

export default LoginProvider;
