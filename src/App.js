import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories')
      .then(response => {
        setRepositories(response.data)
      });
  }, [])

  async function handleAddRepository() {
    // TODO
    api.post('repositories', {
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
      url: "https://github.com/josepholiveira"
    }).then(response=>{
      setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`repositories/${id}`)
      .then(response=>{
        const index = repositories.findIndex((item)=>item.id == id)
        let rep_copy = repositories.slice()
        rep_copy.splice(index, 1)
        setRepositories(rep_copy)
      })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(
          (repository)=>(
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
        </li>
          )
        )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
