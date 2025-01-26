import { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

interface Attribute {
  name: string
}

interface Item {
  id: string,
  attributes: Attribute,
}

interface dataResponse {
  data: Array<Item>;
}



function App() {
  const [dataResp, setDataResp] = useState<dataResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const axiosData = async () => {
      try {
        const response = await Axios.get('https://dogapi.dog/api/v2/groups');
        const data = response.data;
        setDataResp(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    axiosData();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  const showData = () => {

    console.log(dataResp);
    if(!dataResp) {
      return <p> No hay elementos. </p>
    }

    return dataResp?.data?.map((e: Item) => (
      <div>{e.attributes.name}</div>
    ));
  };

  return (
    <>
      <h1>Vite + React</h1>
      <div>{showData()}</div>
    </>
  );
}

export default App;
