import {
  Container,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { auth, provider, facebookProvider, signInWithPopup } from "./firebase";
import { useState } from "react";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginOption, setLoginOption] = useState("");

  const handleLogin = async (selectedProvider) => {
    try {
      let result;
      if (selectedProvider === "google") {
        provider.setCustomParameters({ prompt: "select_account" });
        result = await signInWithPopup(auth, provider);
      } else if (selectedProvider === "facebook") {
        result = await signInWithPopup(auth, facebookProvider);
      }
      setUser(result.user);
    } catch (error) {
      alert("Login Error: " + error.message);
      console.error("Login Error:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="login-option-label">Continue with</InputLabel>
        <Select
          labelId="login-option-label"
          value={loginOption}
          onChange={(e) => {
            setLoginOption(e.target.value);
            if (e.target.value) {
              handleLogin(e.target.value);
            }
          }}
          label="Continue with"
        >
          <MenuItem value="google">Google</MenuItem>
          <MenuItem value="facebook">Facebook</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
};

export default Login;
