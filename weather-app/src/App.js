

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
