import React from "react";
import {StyledDisplay} from "./styles/StyledDisplay";

function Display(props) {
  return (
    <StyledDisplay gameOver={props.gameOver}>
      {props.text}
    </StyledDisplay>
  );
}

export default Display;