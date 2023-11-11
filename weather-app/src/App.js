import "./css/reset.css"
import "./css/App.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Week from "./components/week";
import useCurrentLocation from "./hooks/useCurrentLocation";

function App() {
  const { loaded, address, error } = useCurrentLocation();

  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Week location={address} />
    </div>
  );
}

export default App;
