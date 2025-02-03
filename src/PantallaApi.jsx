import React, { use, useTransition } from "react";
import axios from "axios";

// Creamos una función para obtener los datos que devuelve una promesa
async function fetchCharacters() {
  const response = await axios.get("https://rickandmortyapi.com/api/character");
  return response.data.results;
}

function getSavedCharacter() {
  const savedCharacter = localStorage.getItem("selectedCharacter");
  return savedCharacter ? JSON.parse(savedCharacter) : null;
}

const PantallaApi = () => {
  const characters = use(fetchCharacters());
  const [selectedCharacter, setSelectedCharacter] = React.useState(getSavedCharacter());
  const [isPending, startTransition] = useTransition();

  const handleSelectCharacter = (character) => {
    startTransition(() => {
      setSelectedCharacter(character);
      localStorage.setItem("selectedCharacter", JSON.stringify(character));
    });
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-5">Ricky y Morty serie</h1>
      {isPending && <p>Cargando...</p>}
      {selectedCharacter && (
        <div className="mb-5">
          <div className="row g-3 mx-auto">
            <div className="col-md-4 text-center">
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <strong>
                  <h5 className="card-title">{selectedCharacter.name}</h5>
                </strong>
                <p className="card-text">
                  <strong>Estado:</strong> {selectedCharacter.status}
                </p>
                <p className="card-text">
                  <strong>Especie:</strong> {selectedCharacter.species}
                </p>
                <p className="card-text">
                  <strong>Creacion del personaje:</strong> {selectedCharacter.created}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        {characters.map((character) => (
          <div
            key={character.id}
            className="col-6 col-md-4 col-lg-2 mb-4"
            onClick={() => handleSelectCharacter(character)}
          >
            <div className="card h-100 cursor-pointer">
              <img
                src={character.image}
                alt={character.name}
                className="card-img-top"
              />
              <div className="card-body text-center">
                <h5 className="card-title">{character.name}</h5>
                <p>{character.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PantallaApi;