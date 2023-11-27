import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/errores.css";

export default function LoginCliente() {
  //Navegación
  const navigate = useNavigate();

  //Estado cargando =>Para el botón de enviar porsi hay fallos en el internet
  const [cargando, setCargando] = useState(false);

  //Estado de contraseña
  const [mostrarPass, setMostrarPass] = useState(false);

  //Manejo de errores de correo electronico y contraseña
  const [errors, setErrors] = useState({
    correo_electronico: "",
    contrasena: "",
  });

  //Estado del login
  const [login, setLogin] = useState({
    correo_electronico: "",
    contrasena: "",
  });

  //Mostrar u ocultar la contraseña del login
  const togglePassVisibility = () => {
    setMostrarPass(!mostrarPass); //POnemos el estado contrario al que este
  };

  // Estado para manejar errores
  const [error, setError] = useState(null);

  //Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //El estado esta cargando
    // Validar que los campos no estén vacíos
    const newErrors = {};
    if (login.correo_electronico.trim() === "") {
      newErrors.correo_electronico = "Indica tu dirección de e-mail";
    }
    if (login.contrasena.trim() === "") {
      newErrors.contrasena = "Introduce tu contraseña";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setCargando(true);
    //Creamos la petición
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      setError("Las credenciales no coincide con ningun usuario.");
      setCargando(false);
      return;
    } else {
      const data = await res.json();
      console.log(data);
      setCargando(false);
      navigate("/");
    }
  };
  //Capturar textField de cada atributo del login
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card
          sx={{ m: 5 }}
          style={{
            padding: "1rem",
          }}
        >
          <Typography
            variant="h5"
            textAlign="center"
            color="primary"
            gutterBottom
          >
            Inicio de sesión
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <Typography className="error-message">{error}</Typography>
              )}
              <TextField
                variant="outlined"
                label="Correo Electrónico"
                fullWidth
                margin="normal"
                name="correo_electronico"
                onChange={handleChange}
                error={Boolean(errors.correo_electronico)}
                helperText={errors.correo_electronico}
              />

              <TextField
                variant="outlined"
                label="Contraseña"
                fullWidth
                margin="normal"
                type={mostrarPass ? "text" : "password"}
                onChange={handleChange}
                name="contrasena"
                error={Boolean(errors.contrasena)}
                helperText={errors.contrasena}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePassVisibility}>
                        {mostrarPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "1rem" }}
                disabled={cargando}
                type="submit"
              >
                {cargando ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
