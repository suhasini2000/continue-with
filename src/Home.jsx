import { Button, Container, Typography, Avatar } from "@mui/material";
import { signOut, auth } from "./firebase";

const Home = ({ user, setUser }) => {
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Avatar src={user.photoURL} sx={{ width: 80, height: 80, margin: "auto" }} />
      <Typography variant="h5" gutterBottom>Welcome, {user.displayName}</Typography>
      <Typography variant="body1" gutterBottom>{user.email}</Typography>
      <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Home;
