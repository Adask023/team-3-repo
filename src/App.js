import './App.css';
import { Login, MainView } from "./Pages"

function App() {
  const login = localStorage.getItem("login");


  return (
    <div className="App">
      {login ? <MainView /> : <Login />}
    </div>
  );
}

export default App;
