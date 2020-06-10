import React from 'react';
import TokenLoader from './Components/TokenLoader';

function App() {
  return (
    <div className="App">
      <TokenLoader>{({ token }) => <div token={token} />}</TokenLoader>
    </div>
  );
}

export default App;
