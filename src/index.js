import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import App from './App';

let countIncrement = count => {
  return {
    type: 'INCREMENT',
    count
  };
};
let countDecrement = count => {
  return {
    type: 'DECREMENT',
    count
  };
};
let countReset = count => {
  return {
    type: 'RESET',
    count
  };
};

let loggedInToggler = () => {
  return {
    type: 'LOGGED_IN'
  };
};

const countReducer = (state = 100, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const increment = action.count ? action.count : 5;
      return state + increment;
    case 'DECREMENT':
      const decrement = action.count ? action.count : 5;
      return state - decrement;
    case 'RESET':
      return action.count;
    default:
      return state;
  }
};

const loogedReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return !state;

    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    count: countReducer,
    isLoggedIn: loogedReducer
  })
);

let mapStateToProps = state => {
  return {
    count: state.count,
    loggedIn: state.isLoggedIn
  };
};
let mapDispatchToProps = dispatch => {
  return {
    inCrementCount: number => {
      dispatch(countIncrement(number));
    },
    deCrementCount: number => {
      dispatch(countDecrement(number));
    },
    resetCount: number => {
      dispatch(countReset(number));
    },
    toggleLoggedIn: () => {
      dispatch(loggedInToggler());
    }
  };
};

const ReduxConnect = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <ReduxConnect />
  </Provider>,
  document.getElementById('root')
);
