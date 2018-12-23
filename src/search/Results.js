import React from "react";
import styled from "@emotion/styled";
import Pet from "./Pet";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 3rem 2.4rem;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
`;

const Results = ({ pets }) => {
  return (
    <Wrapper>
      {pets.map(pet => {
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }
        return (
          <Pet
            animal={pet.animal}
            key={pet.id}
            name={pet.name}
            breed={breed}
            media={pet.media}
            location={`${pet.contact.city}, ${pet.contact.state}`}
            id={pet.id}
          />
        );
      })}
    </Wrapper>
  );
};

export default Results;
