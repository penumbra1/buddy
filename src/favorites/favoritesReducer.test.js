import reducer, { toggleFavorite } from "./favoritesReducer";

test("toggleFavorite creates an action object correctly", () => {
  const action = toggleFavorite({});

  expect(action).toEqual({ type: "TOGGLE_FAVORITE", pet: {} });
});

test("reducer should return initial state", () => {
  expect(reducer(undefined, {})).toEqual([]);
});

test("reducer should toggle a favorite pet", () => {
  const pet = { id: 1 };
  const action = toggleFavorite(pet);
  let state = [];

  state = reducer(state, action);
  expect(state).toEqual([pet]);
  expect(reducer(state, action)).toEqual([]);

  state = [{ id: 2 }, pet, { id: 3 }];
  expect(reducer(state, action)).toEqual([{ id: 2 }, { id: 3 }]);
});
