import React from 'react';

function Food(props) {
  const { food } = props;
  const style = {
    top: `${food[1]}px`,
    left: `${food[0]}px`,
  };
  return <img src={require("../img/food.png")} className="snake-food" style={style} alt="Food"></img>;
}

export default Food;
