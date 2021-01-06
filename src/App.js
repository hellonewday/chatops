import "./App.css";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import Header from "./components/Header";
import { useSelector } from "react-redux";

function App() {
  const [value, setValue] = useState("");
  const [setOfValue, setValueSet] = useState([]);

  useEffect(() => {
  }, []);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleFile = (event) => {
    event.preventDefault();
    if (
      event.target.files[0] &&
      event.target.files[0].type === "application/vnd.ms-excel"
    ) {
      let reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        console.log(e.target);
        let csvMatrix = text
          .split("\n")
          .slice(1, text.split("\n").length)
          .map((item) => {
            return item.split(",");
          });
        setValue(
          csvMatrix
            .map((item) => {
              return item[1];
            })
            .join(" ")
        );
      };
      reader.readAsText(event.target.files[0]);
    } else if (
      event.target.files[0] &&
      event.target.files[0].type === "text/plain"
    ) {
      let reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        setValue(text);
      };
      reader.readAsText(event.target.files[0]);
    } else {
      return false;
    }
  };

  const handleIndent = (e) => {
    e.preventDefault();
    console.log("Intent");
    console.log(value);
    // Good practice for txt file.
    console.log(value.split(/[\n]+/));
    console.log(value.split(/[\n.\s]+/));
  };

  const handleCorrect = (e) => {
    e.preventDefault();
    console.log("Correct");
    console.log(value);
    // console.log(value.split(/[\n\s]+/));
    console.log(value.split(/[\n.\s]+/));
  };
  return (
    <div>
      <br />
      <Container>
        <TextareaAutosize
          rowsMin={10}
          onChange={handleChange}
          value={value}
          style={{ width: "100%" }}
          placeholder="Nhập dữ liệu"
        />
        <br />
        <Typography variant="h6">
          hoặc tải lên file .txt hoặc .csv:{" "}
          <input onChange={handleFile} type="file" accept=".txt, .csv" />
        </Typography>
        <br />
        <ButtonGroup fullWidth>
          <Button
            style={{ backgroundColor: "#4caf50", color: "white" }}
            variant="contained"
            onClick={handleCorrect}
          >
            Spell correction
          </Button>
          <Button
            style={{ backgroundColor: "#e53935", color: "white" }}
            variant="contained"
            onClick={handleIndent}
          >
            Intent Detection
          </Button>
        </ButtonGroup>

        <br />
        <div style={{ lineBreak: 0.5 }}>{value}</div>
      </Container>
    </div>
  );
}

export default App;
