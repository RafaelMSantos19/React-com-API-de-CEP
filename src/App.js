import React, {useState} from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import './style.css';

function App() {

  const[ input, setInput]= useState('')
  const [cep, setCEP] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert("Preencha com um CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      setCEP(response.data);
      setInput(" ")
      console.log(response.data);
      
    }catch{
      alert("Erro 404!")
      setInput("")
    }
  }

  return (
    <div className="Container">

       <h1 className="title">Buscador de CEP</h1>    
        
        <div className="containerInput">

          <input type="text" placeholder="Digite seu CEP..." value={input} onChange={(e)=> setInput(e.target.value)}/>

          <button className="buttonSearch" onClick={handleSearch}> <FiSearch size={25} color="#000" /> </button>

        </div>

        {Object.keys(cep).length > 0  && (

          <main className='main'>
            <h2>CEP: {cep.cep} </h2>

            <span>Rua: {cep.logradouro}</span>
            <span>Bairro: {cep.bairro} </span>
            <span>Cidade: {cep.localidade} </span>
            <span>Estado: {cep.uf} </span>
          </main>

        )}

      

    </div>
  );
}

export default App;
