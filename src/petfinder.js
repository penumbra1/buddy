import pf from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const wrapInArray = data => {
  if (Array.isArray(data)) {
    return data;
  } else {
    return [data];
  }
};

const pickCleanData = ({ id, animal, name, sex, age, description }) => ({
  id,
  animal,
  name,
  sex,
  age,
  description
});

const cleanPetData = pet => {
  const cleanPet = pickCleanData(pet);

  // Breed
  cleanPet.breeds = wrapInArray(pet.breeds.breed);

  // Location
  const { state, city, ...contact } = pet.contact;
  cleanPet.state = state.trim();
  cleanPet.city = city.trim();
  cleanPet.contact = contact;

  // Hero image
  // let photos = [];
  // if (pet.media && pet.media.photos && pet.media.photos.photo) {
  //   photos = pet.media.photos.photo.filter(photo => photo["@size"] === "pn");
  // }

  // let hero = null;
  // if (photos[0] && photos[0].value) {
  //   hero = photos[0].value;
  // }

  cleanPet.media = pet.media;

  return cleanPet;
};

export const search = params => {
  return petfinder.pet
    .find({
      ...params,
      output: "full"
    })
    .then(data => {
      let pets;
      if (data.petfinder.pets && data.petfinder.pets.pet) {
        pets = wrapInArray(data.petfinder.pets.pet);
      } else {
        pets = [];
      }
      return pets.map(cleanPetData);
    });
};

export const getBreeds = animal => {
  if (!animal) return Promise.resolve([]);
  return petfinder.breed
    .list({ animal })
    .then(data => {
      if (data.petfinder.breeds && data.petfinder.breeds.breed) {
        return wrapInArray(data.petfinder.breeds.breed);
      } else return [];
    })
    .catch(console.error);
};

export default petfinder;
