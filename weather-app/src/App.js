import './css/App.css'
import './css/reset.css'
import useCurrentLocation from './hooks/useCurrentLocation'
import Container from './components/container'
import Expention from './components/exponsion/expension'

function App() {
  const { loaded, address, error } = useCurrentLocation();

  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">

      <Container location={address} />
      <Expention location={address} />

    </div>
  );
}

export default App;
