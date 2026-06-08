import { useState } from 'react';
import './App.css'
import { Modal } from './components/Modal/Modal';
import type { FormValues } from './validation/formSchema';
import { UncontrolledForm } from './components/UncontrolledForm/UncontrolledForm';
import { ReactHookForm } from "./components/ReactHookForm/ReactHookForm";
import { useFormStore } from "./store/formStore";

function App() {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [isHookFormOpen, setIsHookFormOpen] = useState(false);

  const history = useFormStore((state) => state.history);
  const addToHistory = useFormStore((state) => state.addToHistory);

  const handleUncontrolledSubmit = (data: FormValues) => {
      addToHistory(data);
      setIsUncontrolledOpen(false); 
  };

  const handleHookFormSubmit = (data: FormValues) => {
      addToHistory(data);
      setIsHookFormOpen(false); 
  };

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
          <UncontrolledForm onSubmit={handleUncontrolledSubmit} />
        </Modal>
      )}

      {isHookFormOpen && (
        <Modal onClose={() => setIsHookFormOpen(false)}>
          <h2>React Hook Form</h2>
          <ReactHookForm onSubmit={handleHookFormSubmit} />
        </Modal>
      )}
      <div className='mt-4'>
        {history.map((item, index) => (
          <div key={index}>
            {item.name} - {item.email} - {item.age}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;