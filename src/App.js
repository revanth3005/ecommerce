import logo from "./logo.svg";
import "./App.css";
import RoutePages from "./Components/Routes/RoutePages";
import Navbar from "./Components/Header/Navbar";
import ContextAPI from "./context/ContextAPI";

function App() {
  return (
    <>
      <ContextAPI>
        <Navbar />
        <RoutePages />
      </ContextAPI>
    </>
  );
}

export default App;
