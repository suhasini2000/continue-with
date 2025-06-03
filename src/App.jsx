import Login from "./Login";
import AnimalGamePanel from "./AnimalGamePanel";
import "./index.css";

function App() {
  return (
    <div>
      <h1 className="main-heading">GenInfotech</h1>
      <div className="panel-container">
        <div className="panel">
          <Login />
        </div>
        <div className="panel center">
          {/* Center panel content (optional) */}
        </div>
        <div className="panel">
          <AnimalGamePanel />
        </div>
      </div>
    </div>
  );
}

export default App;
