import { Typography, Paper } from "@mui/material";
import AnimalGuessGame from "./AnimalGuessGame";

const AnimalGamePanel = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        height: "100%",
        borderRadius: 3,
        backgroundColor: "#e3f2fd",
      }}
    >
      
      <AnimalGuessGame />
    </Paper>
  );
};

export default AnimalGamePanel;
