import React, { Component } from 'react';
import { Consumer } from '../context';
import classnames from 'classnames';

export default class Popup extends Component {
  state = {
    name: '',
    finalScore: 0,
    nameError: {},
  };

  onFormSubmit = (dispatch, e) => {
    e.preventDefault();

    const { name, finalScore } = this.state;
    if (name === '') {
      this.setState({
        nameError: { name: 'Name is required' },
      });
      return;
    }
    const action = {
      name,
      score: finalScore,
    };
    dispatch(action);
    document.getElementsByClassName('popup')[0].style.display = 'none';
    this.setState({
      name: '',
      finalScore: 0,
      nameError: '',
    });
    this.props.rsGame();
  };

  componentDidUpdate() {
    var { score } = this.props;
    if (score > this.state.finalScore) {
      this.setState({ finalScore: score });
    }
    if (score < this.state.finalScore) {
      this.setState({ finalScore: score });
    }
  }

  render() {
    const { name, finalScore, nameError } = this.state;
    const error = nameError.name;
    var { score, rsGame } = this.props;
    return (
      <div className="popup rounded">
        <div
          className="card text-center"
          style={{ width: '100%', height: '100%' }}
        >
          <div className="card-header text-center bg-dark text-light">
            Game Over!
            <i
              className="fas fa-times text-danger"
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={() => {
                var x = document.getElementsByClassName('popup')[0];
                x.style.display = 'none';
                rsGame();
              }}
            ></i>
          </div>
          <div className="card-body" style={{ height: '100%' }}>
            <Consumer>
              {(value) => {
                const { LeaderBoard, dispatch } = value;
                var len = LeaderBoard.length;
                return (
                  <React.Fragment>
                    {(len <= 10 || LeaderBoard[len - 1] < finalScore) &&
                    score !== 0 ? (
                      <div>
                        <h4>You have made it to the LeaderBoard!</h4>
                        <p>Score : {finalScore}</p>
                        <form
                          className="form-popup form-group"
                          onSubmit={this.onFormSubmit.bind(this, dispatch)}
                        >
                          <label htmlFor="name" className="text-left">
                            Enter to your name:
                          </label>
                          <input
                            name="name"
                            type="text"
                            className={classnames(
                              'form-control form-control-lg mb-3',
                              {
                                'is-invalid': error,
                              }
                            )}
                            value={name}
                            onChange={(e) => {
                              this.setState({ name: e.target.value });
                            }}
                          ></input>
                          {error && (
                            <div className="invalid-feedback">{error}</div>
                          )}

                          <input
                            type="submit"
                            value="Submit"
                            style={{
                              width: '50%',
                              position: 'relative',
                              left: '25%',
                            }}
                          ></input>
                          <p>
                            <strong>Note: </strong> After you close this popup
                            or Submit your details , press any control to
                            restart the Game{' '}
                          </p>
                        </form>
                      </div>
                    ) : (
                      <div style={{ height: '120%' }}>
                        <h4>Score : {score}</h4>
                        <p>Try Again.</p>
                        <button
                          value="OK"
                          onClick={() => {
                            var x = document.getElementsByClassName('popup')[0];
                            x.style.display = 'none';
                            rsGame();
                          }}
                        >
                          {' '}
                          Click Here
                        </button>
                        <p>
                          <strong>Note: </strong> After you close this popup or
                          pressed "Click Here" button , press any control to
                          restart the Game{' '}
                        </p>
                      </div>
                    )}
                  </React.Fragment>
                );
              }}
            </Consumer>
          </div>
        </div>
      </div>
    );
  }
}
