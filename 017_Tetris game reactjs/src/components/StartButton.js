import React from "react";
import {StyledStartButton} from "./styles/StyledStartButton";

function StartButton(props) {
  return (
    <StyledStartButton onClick={props.callback}>
      Start Game
    </StyledStartButton>
  );
}

export default StartButton;