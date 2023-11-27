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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../estilos/errores.css";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";

export default function RegistrarCliente() {
  // Estados adicionales para manejar los mensajes de error
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEdad, setErrorEdad] = useState(false);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    usuario: "",
    nombre: "",
    contrasena: "",
    apellidos: "",
    telefono: "",
    correo_electronico: "",
    fecha_nacimiento: "",
  });
  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(dayjs());
    }, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatearFecha = (date) => dayjs(date).format("YYYY-MM-DD");

  const togglePassVisibility = () => {
    setMostrarPass(!mostrarPass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    // Validaciones
    const fechaFormateada = formatearFecha(usuario.fecha_nacimiento);
    const fechaNacimiento = dayjs(usuario.fecha_nacimiento);
    const edad = dayjs().diff(fechaNacimiento, "year");

    setErrorEdad(edad < 18);

    const passwordReqs =
      usuario.contrasena.length < 8 ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(usuario.contrasena);
    setErrorPassword(passwordReqs || usuario.contrasena !== confirmPassword);

    // Validación de campos requeridos
    const camposRequeridos = [
      "usuario",
      "nombre",
      "apellidos",
      "correo_electronico",
      "telefono",
      "fecha_nacimiento",
      "contrasena",
      "confirmar_contrasena",
    ];
    const camposVacios = camposRequeridos.filter((field) => !usuario[field]);
    if (
      camposVacios.length > 0 ||
      edad < 18 ||
      passwordReqs ||
      usuario.contrasena !== confirmPassword
    ) {
      setCargando(false);
      // Mostrar mensajes de error para campos vacíos o incorrectos
      camposVacios.forEach((field) => {
        console.log(`El campo ${field} es requerido`);
        setErrorMessage(`El campo ${field} es requerido`);
        setOpenError(true);
      });
      if (edad < 18) {
        console.log("Debe ser mayor de edad");
        setErrorMessage("Debe ser mayor de 18 años");
        setOpenError(true);
      }
      if (passwordReqs || usuario.contrasena !== confirmPassword) {
        console.log("Contraseña inválida");
        setErrorMessage("Contraseña inválida");
        setOpenError(true);
      }
      return;
    }

    const dataToSend = {
      ...usuario,
      fecha_nacimiento: fechaFormateada,
    };

    try {
      const res = await fetch("http://localhost:3000/clientes", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setCargando(false);
      navigate("/");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "fecha_nacimiento") {
      value = dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD") : "";
    }
    setUsuario({ ...usuario, [e.target.name]: value });

    if (e.target.name === "confirmar_contrasena") {
      setConfirmPassword(value);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      justifyContent="center"
    >
      <Card
        sx={{ mt: 3 }}
        style={{
          padding: "1rem",
        }}
      >
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={() => setOpenError(false)}
        >
          <Alert onClose={() => setOpenError(false)} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
        <Typography variant="5" textAlign="center" color="black">
          Crear Cuenta
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="filled"
              label="Nombre"
              sx={{
                display: "block",
                margin: ".5rem 0",
              }}
              name="nombre"
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Apellidos"
              sx={{
                display: "block",
                margin: ".5rem 0",
              }}
              name="apellidos"
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Nombre de usuario"
              sx={{
                display: "block",
                margin: ".5rem 0",
              }}
              name="usuario"
              onChange={handleChange}
            />

            <TextField
              variant="filled"
              label="Correo Electrónico"
              sx={{
                display: "block",
                margin: ".5rem 0",
              }}
              name="correo_electronico"
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Número de telefono"
              sx={{
                display: "block",
                margin: ".5rem 0",
              }}
              name="telefono"
              onChange={handleChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DatePicker"]}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
              >
                <DatePicker
                  label="Fecha de Nacimiento"
                  value={currentDate}
                  onChange={(date) => {
                    setUsuario({ ...usuario, fecha_nacimiento: date });
                    const edad = dayjs().diff(dayjs(date), "year");
                    setErrorEdad(edad < 18); // Actualiza el estado de error
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              variant="filled"
              label="Contraseña"
              type={mostrarPass ? "text" : "password"}
              sx={{
                display: "block",
                margin: ".5rem 0",
              }}
              name="contrasena"
              onChange={handleChange}
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
            <TextField
              variant="filled"
              label="Confirmar Contraseña"
              type={mostrarPass ? "text" : "password"}
              sx={{
                display: "block",
                margin: ".5rem 0",
              }}
              name="confirmar_contrasena"
              onChange={handleChange}
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

            <Button variant="contained" color="primary" type="submit">
              {cargando ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}
