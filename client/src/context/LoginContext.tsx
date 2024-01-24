import {
  PropsWithChildren,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { loginContext, Admin, Credentials } from "../Interfaces";

const LoginContext = createContext<loginContext>({
  loggedInAdmin: null,
  loginAdmin: async () => Promise.resolve(),
  logoutAdmin: () => Promise.resolve(),
});

export const useLoginContext = () => useContext(LoginContext);

const LoginProvider = ({ children }: PropsWithChildren<object>) => {
  const [loggedInAdmin, setLoggedInAdmin] = useState<Admin | null>(null);
  const [shouldAuthorize, setShouldAuthorize] = useState(false);
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
        setShouldAuthorize(true);
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
        setShouldAuthorize(true);
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log("Logged In Admin:", loggedInAdmin);
  }, [loggedInAdmin]);

  useEffect(() => {
    async function authorizeAdmin() {
      try {
        if (loggedInAdmin) {
          console.log("is logged in");
        } else {
          const response = await fetch("/api/admin/authorize");
          if (response.status === 200) {
            const data = await response.json();
            setLoggedInAdmin(data);
          } else if (response.status === 401) {
            setLoggedInAdmin(null);
          } else {
            console.log("Unexpected response from server");
          }
          setShouldAuthorize(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    authorizeAdmin();
  }, [shouldAuthorize]);

  return (
    <div>
      <LoginContext.Provider
        value={{
          loggedInAdmin,
          loginAdmin,
          logoutAdmin,
        }}
      >
        {children}
      </LoginContext.Provider>
    </div>
  );
};

export default LoginProvider;