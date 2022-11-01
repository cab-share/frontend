import './App.css';
import Map from './container/Map/Map.js'

function App() {

  const [autocomplete, setAutoComplete] = useState(null);



  return (
    <div className='App' >
      <div className='App-header'>
        <Map
          autoComplete={autoComplete}
          setAutoComplete={setAutoComplete}
        /> 
      </div>
    </div>
  );
}

export default App;
