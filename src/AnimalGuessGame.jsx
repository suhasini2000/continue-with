import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const AnimalGuessGame = () => {
  const [animals, setAnimals] = useState([]);
  const [index, setIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/animals")
      .then(res => res.json())
      .then(data => setAnimals(data));
  }, []);

  useEffect(() => {
    if (animals.length > 0) {
      setInputs(Array(animals[index].name.length - 2).fill(""));
      setFeedback("");
    }
  }, [animals, index]);

  if (animals.length === 0) return <Typography>Loading...</Typography>;

  const animal = animals[index];

  const handleInputChange = (value, i) => {
    const newInputs = [...inputs];
    newInputs[i] = value;
    setInputs(newInputs);
  };

  const getFullWord = () => {
    let result = animal.name[0];
    for (let i = 0; i < inputs.length; i++) {
      result += inputs[i] || "_";
    }
    result += animal.name.slice(-1);
    return result;
  };

  const handleGuess = () => {
    if (getFullWord().toLowerCase() === animal.name.toLowerCase()) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try again!");
    }
  };

  const nextAnimal = () => {
    setIndex((index + 1) % animals.length);
    setInputs(Array(animals[(index + 1) % animals.length].name.length - 2).fill(""));
    setFeedback("");
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Guess the Animal</Typography>
      <img
        src={`http://localhost:5000/api/animal_image/${animal.id}`}
        alt="animal"
        style={{ width: "100%", borderRadius: 8, marginTop: "10px" }}
      />
      <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
        <span style={{ width: "20px", textAlign: "center", fontSize: "20px" }}>
          {animal.name[0]}
        </span>
        {inputs.map((val, i) => (
          <input
            key={i}
            maxLength={1}
            value={val}
            onChange={(e) => handleInputChange(e.target.value, i)}
            style={{
              width: "20px",
              fontSize: "20px",
              textAlign: "center",
              border: "none",
              borderBottom: "2px solid black",
              outline: "none",
              background: "transparent",
            }}
          />
        ))}
        <span style={{ width: "20px", textAlign: "center", fontSize: "20px" }}>
          {animal.name.slice(-1)}
        </span>
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
