import './App.css'
import Header from "./components/header/header"
import AddKeeper from "./components/addKeeper/addKeeper"
import ShowKeeper from "./components/showkeeper/showKeeper"
import { useState, useEffect  } from "react"
import axios from "axios"

function App() {

  const [ keeperList, setKeeperList ] = useState([])

  useEffect(() => {                                       
    axios.get("http://localhost:3001/api/getAll")         //here using hooks and calling getAll api to get the obejct 
    .then(res => setKeeperList(res.data))                 //and get stored in KeeperList
  }, [])


  //for setting the addkeeper states we have passed them as (PROPS) from here
  //for showing the keeper content we have to pass the all content using (PROPS METHOD)
  //for backend starting point is index.js
  
  return (
    <div className="App">
      <Header />
      <AddKeeper keeperList={keeperList} setKeeperList={setKeeperList} />
      <ShowKeeper keeperList={keeperList} setKeeperList={setKeeperList} /> 
    </div>
  );
}

export default App;
