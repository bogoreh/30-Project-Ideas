import React, { Component } from 'react';

export default class Snake extends Component {
  render() {
    return (
      <div>
        {this.props.snakeDots.map((dot, i) => {
          const style = { top: `${dot[1]}px`, left: `${dot[0]}px` };
          return <div className="snake-part" key={i} style={style}></div>;
        })}
      </div>
    );
  }
}
