import React from 'react';

const App = props => {
  // console.log(props);
  return (
    <div>
      <h1>{props.count}</h1>
      <h2>{props.loggedIn ? 'You are looged in' : 'You are not logged in'}</h2>
      <h3>{props.fetchedName}</h3>

      <button onClick={() => props.inCrementCount(10)}>INC</button>
      <button onClick={() => props.deCrementCount(5)}>DEC</button>
      <button onClick={() => props.resetCount(0)}>RESET</button>
      <button onClick={() => props.toggleLoggedIn()}>TOGGLE LOGIN</button>
      <button onClick={() => props.fetchUsersName()}>ONLINE FETCH</button>
    </div>
  );
};

export default App;
