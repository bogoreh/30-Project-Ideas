import React from "react";
import Cell from "./Cell";
import {StyledStage} from "./styles/StyledStage";

function Stage(props) {
  return (
    <StyledStage
      width={props.stage[0].length}
      height={props.stage.length}>
      {props.stage.map(row =>
        row.map((cell, x) => {
          return (
            <Cell
              key={x}
              type={cell[0]}
            />
          );
        })
      )}
    </StyledStage>
  );
}

export default Stage;