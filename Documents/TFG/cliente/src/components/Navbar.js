import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link style={{ textDecoration: "none", color: "blue" }} to="/">
                VAPEXPRESS
              </Link>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Iniciar Sesión
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/registro")}
            >
              Registrarse
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
