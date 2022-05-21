import React from 'react';

function Person(props) {
  const { rank, name, score } = props;
  return (
    <div className="card-group">
      <div className="card">
        <p className="card-text p-2">{rank}</p>
      </div>
      <div className="card">
        <p className="card-text p-2">{name}</p>
      </div>
      <div className="card">
        <p className="card-text p-2">{score}</p>
      </div>
    </div>
  );
}

export default Person;
