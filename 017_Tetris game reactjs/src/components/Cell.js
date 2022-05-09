import React from "react";
import {StyledCell} from "./styles/StyledCell";
import {TETROMINOS} from "../utils/tetrominos";

function Cell(props) {
  console.log("rerender");
  return (
    <StyledCell
      type={props.type}
      color={TETROMINOS[props.type].color} />
  );
}

export default React.memo(Cell);