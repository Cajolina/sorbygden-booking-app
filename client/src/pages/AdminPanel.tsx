import { Button, Result } from "antd";
import { useLoginContext } from "../context/LoginContext";

function AdminPanel() {
  const { loggedInAdmin, logoutAdmin } = useLoginContext();

  // If not logged in, show a image and message saying the user is not authorized
  if (!loggedInAdmin) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Du är inte behörig till denna sida. Logga in för att fortsätta."
        extra={
          <Button href="/login" type="primary">
            Logga in
          </Button>
        }
      />
    );
  }

  const handleLogoutClick = () => {
    logoutAdmin();
    window.location.href = "/login";
  };

  return (
    <div>
      <p>Inloggad som {loggedInAdmin?.firstName}</p>
      <Button onClick={handleLogoutClick} type="text">
        Logga ut
      </Button>
    </div>
  );
}

export default AdminPanel;
