import pf from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

export const search = params => {
  return petfinder.pet
    .find({
      ...params,
      output: "full"
    })
    .then(data => {
      let pets;
      if (data.petfinder.pets && data.petfinder.pets.pet) {
        if (Array.isArray(data.petfinder.pets.pet)) {
          pets = data.petfinder.pets.pet;
        } else {
          pets = [data.petfinder.pets.pet];
        }
      } else {
        pets = [];
      }
      return pets;
    });
};

export const getBreeds = animal => {
  if (animal) {
    return petfinder.breed
      .list({ animal })
      .then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          return data.petfinder.breeds.breed;
        } else {
          return [data.petfinder.breeds.breed];
        }
      })
      .catch(console.error);
  } else {
    return Promise.resolve([]);
  }
};

export default petfinder;
