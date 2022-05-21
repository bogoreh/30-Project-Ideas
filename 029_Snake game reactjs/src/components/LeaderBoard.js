import React, { Component } from 'react';
import { Consumer } from '../context';
import Person from './Person';

class LeaderBoard extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { LeaderBoard } = value;
          return (
            <div style={{ width: '50%' }} >
            <div className="container">
              <h2>Controls:<img className="ml-3" width='80px' src="https://www.pngkit.com/png/full/179-1791596_wasd-keys-png-wasd-keys.png" alt="contollers"/></h2>
            </div>
            <div className="leaderboard mt-4">
              <div className="card">
                <div className="card-header text-center display-4">Leaderboard</div>
                <div className="card-body text-center">
                  <div className="card-group">
                    <div className="card">
                      <div className="card-header text-uppercase font-weight-normal">Rank</div>{' '}
                    </div>
                    <div className="card">
                      <div className="card-header text-uppercase font-weight-normal">Name</div>{' '}
                    </div>
                    <div className="card">
                      <div className="card-header text-uppercase font-weight-normal">Score</div>{' '}
                    </div>
                  </div>
                  {LeaderBoard.map((person) => (
                    <Person
                      key={person.rank}
                      name={person.name}
                      rank={person.rank}
                      score={person.score}
                    ></Person>
                  ))}
                </div>
              </div>
            </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default LeaderBoard;
