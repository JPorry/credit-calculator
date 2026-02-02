import React from 'react';
import Calculator from './components/Calculator';

function App() {
  return (
    <>
      <header style={{marginBottom: '20px', textAlign: 'center'}}>
        <h1>DSCR Calculator</h1>
        <p style={{color: 'var(--text-secondary)'}}>Quickly analyze property credit coverage</p>
      </header>
      <main>
        <Calculator />
      </main>
    </>
  );
}

export default App;
