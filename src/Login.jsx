import { Container, Typography, Stack, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { auth, googleProvider, facebookProvider, signInWithPopup } from "./firebase";
import { useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Login = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [providerSelected, setProviderSelected] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");

  const handleLogin = async (provider) => {
    setProviderSelected(true); // Hide dropdown after selection
    setLoading(true);
    try {
      if (provider === "google") {
        googleProvider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(auth, googleProvider);
        setUser(result.user);
      } else if (provider === "facebook") {
        const result = await signInWithPopup(auth, facebookProvider);
        setUser(result.user);
      }
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        // Optionally, show a friendlier message or do nothing
        // alert("You closed the popup before logging in.");
      } else {
        alert("Login Error: " + error.message);
      }
      console.error("Login Error:", error);
      setProviderSelected(false); // Allow retry if error
      setSelectedProvider("");    // Reset dropdown
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedProvider(value);
    handleLogin(value);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Welcome Back
      </Typography>
      <Stack spacing={2} mt={4}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!providerSelected && (
          <FormControl fullWidth>
            <InputLabel id="provider-label">Continue with</InputLabel>
            <Select
              labelId="provider-label"
              label="Continue with"
              disabled={loading}
              value={selectedProvider}
              onChange={handleSelectChange}
            >
              <MenuItem value="google">
                <GoogleIcon sx={{ mr: 1 }} /> Google
              </MenuItem>
              <MenuItem value="facebook">
                <FacebookIcon sx={{ mr: 1 }} /> Facebook
              </MenuItem>
            </Select>
          </FormControl>
        )}
      </Stack>
    </Container>
  );
};

export default Login;
