import { Button } from "@chakra-ui/react";
import { logout } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Button onClick={handleLogout} colorScheme="red" variant="outline" ml={4} mt={4}>
      Logout
    </Button>
  );
}

export default LogoutButton;
