import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import animals from "./animals.js";

const AnimalGuessGame = () => {
  const [index, setIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [feedback, setFeedback] = useState("");

  const currentAnimal = animals[index];
  const { name, masked, image } = currentAnimal;

  // Initialize inputs based on masked word
  useState(() => {
    const blanks = (masked.match(/_/g) || []).map(() => "");
    setInputs(blanks);
  }, [index]);

  const handleInputChange = (value, i) => {
    const newInputs = [...inputs];
    newInputs[i] = value;
    setInputs(newInputs);
  };

  const getFullWord = () => {
    let result = "";
    let inputIndex = 0;
    for (let ch of masked) {
      if (ch === "_") {
        result += inputs[inputIndex] || "_";
        inputIndex++;
      } else {
        result += ch;
      }
    }
    return result;
  };

  const handleGuess = () => {
    const userGuess = getFullWord().toLowerCase();
    if (userGuess === name.toLowerCase()) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try again!");
    }
  };

  const nextAnimal = () => {
    setIndex((prev) => (prev + 1) % animals.length);
    setInputs([]);
    setFeedback("");
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Guess the Animal</Typography>
      <img
        src={image}
        alt="animal"
        style={{ width: "100%", borderRadius: 8, marginTop: "10px" }}
      />

      <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
  {masked.split("").map((ch, i) => {
    if (ch === "_") {
      const inputIndex = masked.slice(0, i).split("_").length - 1;
      return (
        <input
          key={i}
          maxLength={1}
          value={inputs[inputIndex] || ""}
          onChange={(e) => handleInputChange(e.target.value, inputIndex)}
          style={{
            width: "20px",
            fontSize: "20px",
            textAlign: "center",
            border: "none",
            borderBottom: "2px solid black",
            outline: "none",
            background: "transparent"
          }}
        />
      );
    } else {
      return (
        <span
          key={i}
          style={{
            width: "20px",
            textAlign: "center",
            fontSize: "20px",
            display: "inline-block"
          }}
        >
          {ch}
        </span>
      );
    }
  })}
</Box>


      <Button variant="contained" onClick={handleGuess} sx={{ mt: 2 }}>
        Submit
      </Button>

      <Typography
        variant="subtitle1"
        sx={{ mt: 1, color: feedback === "Correct!" ? "green" : "red" }}
      >
        {feedback}
      </Typography>

      <Button onClick={nextAnimal} sx={{ mt: 2 }}>
        Next Animal
      </Button>
    </Box>
  );
};

export default AnimalGuessGame;
