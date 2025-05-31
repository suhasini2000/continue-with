import {
  Button,
  Container,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { auth, provider, signInWithPopup } from "./firebase";
import { useState } from "react";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginOption, setLoginOption] = useState("");

  const handleLoginWithGoogle = async () => {
    try {
       provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {/* Username Field */}
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />

      {/* Password Field */}
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />

      {/* Dropdown to continue with Google */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="login-option-label">Continue with</InputLabel>
        <Select
          labelId="login-option-label"
          value={loginOption}
          onChange={(e) => {
            setLoginOption(e.target.value);
            if (e.target.value === "google") {
              handleLoginWithGoogle();
            }
          }}
          label="Continue with"
        >
          <MenuItem value="google">Google</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );
};

export default Login;
