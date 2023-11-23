import CountriesList from "./components/CountriesList/CountriesList";
import Country from "./components/Country/Country";

function App() {
  return (
    <div className="container row">
      <div className="col">
        <CountriesList />
      </div>
      <div className="col">
        <Country />
      </div>
    </div>
  );
}

export default App;
