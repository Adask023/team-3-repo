import logo from './logo.svg';
import './App.css';
import Entries from './components/Entries';
import NewEntry from './components/NewEntry';

function App() {
  return (
    <div className="App">
      <NewEntry />
      
      <Entries />
    </div>
  );
}

export default App;
