import "./App.css";
import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { requestIntention } from "./redux/actions/intention";
import { requestCorrection } from "./redux/actions/correction";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import moment from "moment";

function App() {
  const [value, setValue] = useState("");
  const result = useSelector((state) => ({
    intention: state.intention,
    correction: state.correction,
  }));
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  /* The below function is using for unsupported feature. */
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
    if (value === "") {
      alert("Vui lòng nhập dữ liệu.");
    } else {
      dispatch(
        requestIntention({
          text: value,
          authorization: window.localStorage.getItem("auth_token"),
        })
      );

      console.log(result.intention.intention.success);
    }
  };

  const handleCorrect = (e) => {
    e.preventDefault();
    if (value === "") {
      alert("Vui lòng nhập dữ liệu.");
    } else {
      dispatch(
        requestCorrection({
          text: value,
          authorization: window.localStorage.getItem("auth_token"),
        })
      );

      console.log(result.correction.correction.success);
    }
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
        {/* Below code is using for unsupported feature */}
        {/* <Typography variant="h6">
          hoặc tải lên file .txt hoặc .csv:{" "}
          <input onChange={handleFile} type="file" accept=".txt, .csv" />
        </Typography> */}
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

        {result.intention.intention.success ||
        result.correction.correction.success ? (
          <Alert severity="info">
            [{moment().format("LLLL")}] Hoạt động mới -{" "}
            <Link
              to="/activities"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <b>Kiểm tra</b>
            </Link>
          </Alert>
        ) : (
          ""
        )}

        <br />
      </Container>
    </div>
  );
}

export default App;
