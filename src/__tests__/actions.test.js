import { updateSearch } from "../search/searchReducer";
import { toggleFavorite } from "../favorites/favoritesReducer";

test("updateSearch should create an action correctly", () => {
  const action = updateSearch({ location: "Cleveland, OH" });
  expect(action).toMatchSnapshot();
});

test("toggleFavorite should create an action correctly", () => {
  const action = toggleFavorite("1");
  expect(action).toMatchSnapshot();
});
