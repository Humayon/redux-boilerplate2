import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
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

let OnlineActions = () => {
  return async dispatch => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const res2 = await res.json();
    dispatch({ type: 'ONLINE_NAME', payload: res2[1].name });
  };
};

//Reducers

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

const fetchNameReducer = (state = [], action) => {
  switch (action.type) {
    case 'ONLINE_NAME':
      return [...state, action.payload];

    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    count: countReducer,
    isLoggedIn: loogedReducer,
    onlineName: fetchNameReducer
  }),
  applyMiddleware(thunk)
);

let mapStateToProps = state => {
  return {
    count: state.count,
    loggedIn: state.isLoggedIn,
    fetchedName: state.onlineName
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
    },
    fetchUsersName: () => {
      dispatch(OnlineActions());
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
