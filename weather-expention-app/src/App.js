import "./css/App.css";
import "./css/reset.css";
import useCurrentLocation from "./hooks/useCurrentLocation";
import Expention from "./components/exponsion/expension";

function App() {
  const { loaded, address, error } = useCurrentLocation();

  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Expention location={address} />
    </div>
  );
}

export default App;
