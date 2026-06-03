import { useState } from 'react';
import './App.css'
import { Modal } from './components/Modal/Modal';

function App() {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [isHookFormOpen, setIsHookFormOpen] = useState(false);

  return (
    <main>
      <h1>React Forms</h1>

      <button type="button" className="btn mr-5" onClick={() => setIsUncontrolledOpen(true)}>
        Open Uncontrolled Form
      </button>

      <button type="button" className="btn" onClick={() => setIsHookFormOpen(true)}>
        Open React Hook Form
      </button>

      {isUncontrolledOpen && (
        <Modal onClose={() => setIsUncontrolledOpen(false)}>
          <h2>Uncontrolled Form</h2>
        </Modal>
      )}

      {isHookFormOpen && (
        <Modal onClose={() => setIsHookFormOpen(false)}>
          <h2>React Hook Form</h2>
        </Modal>
      )}
    </main>
  );
}

export default App;