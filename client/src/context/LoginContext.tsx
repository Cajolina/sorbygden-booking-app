import { PropsWithChildren, useState, createContext, useContext } from "react";
import { loginContext, Admin, Credentials } from "../Interfaces";

// Create a context for login-related functionality
const LoginContext = createContext<loginContext>({
  loggedInAdmin: null,
  loginAdmin: async () => Promise.resolve(),
  logoutAdmin: () => Promise.resolve(),
  authorizeAdmin: () => Promise.resolve(),
});

// Custom hook to access the login context
export const useLoginContext = () => useContext(LoginContext);

const LoginProvider = ({ children }: PropsWithChildren<object>) => {
  // State to manage the logged-in admin
  const [loggedInAdmin, setLoggedInAdmin] = useState<Admin | null>(null);

  // Function to check and authorize the admin's login status
  async function authorizeAdmin() {
    try {
      // Send a request to the API endpoint for admin authorization
      const response = await fetch("/api/admin/authorize");
      if (response.status === 200) {
        const data = await response.json();
        // Set the logged-in admin using the received data
        setLoggedInAdmin(data);
      } else {
        setLoggedInAdmin(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to log in the admin
  async function loginAdmin(admin: Credentials): Promise<void> {
    try {
      // Send a POST request to the API endpoint for admin login
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });
      const data = await response.json();
      if (response.status === 200) {
        // Set the logged-in admin using the received data
        setLoggedInAdmin(data);
      }
      if (response.status === 401) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to log out the admin
  async function logoutAdmin() {
    try {
      // Send a POST request to the API endpoint for admin logout
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (response.status === 204) {
        // If logout is successful, set logged-in admin to null
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
