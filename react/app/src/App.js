
import './App.css';
import axios from 'axios';

function App() {
  const api = "http://localhost:3000"

  const handleGet = async () => {
    await axios
    .get(api + "/api/app")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handlePost = async () => {
    await axios
    .post(api + "/api/app",{name: 'new record'})
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
    
  }
  const handlePut = async () => {
    await axios
    .put(api + "/api/app/2",{name: 'Date edit'})
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  const handleDelete = async () => {
    await axios
    .delete(api + "/api/app/2")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className="App">
      <div><h3>Connect API</h3></div>
      <button onClick={handleGet}>GET</button>
      <button onClick={handlePost}>POST</button>
      <button onClick={handlePut}>PUT</button>
      <button onClick={handleDelete}>DELETE</button>
    
    </div>
  );
}

export default App;
