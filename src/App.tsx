import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

interface Dog {
  message: string;
  status: string;
}

function App() {
  const [dogImage, setDogImage] = useState<Dog>({ message: '', status: '' });

  const fetchDog = async () => {
    try {
      const resp = await axios.get('https://dog.ceo/api/breeds/image/random');
      console.log(resp);
      const dog = resp.data;
      setDogImage(dog);
    } catch (e) {
      console.log("Can't get dog image.", e);
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <>
      <h1>Dog Api</h1>
      <div className="img-container">
        <img className="dog-img" src={dogImage.message} alt="Dog Image"></img>
        <button className="btn" onClick={fetchDog}>
          Ver
        </button>
      </div>
    </>
  );
}

export default App;
