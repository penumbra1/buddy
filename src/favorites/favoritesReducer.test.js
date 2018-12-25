import reducer, { toggleFavorite } from "./favoritesReducer";

test("toggleFavorite creates an action object correctly", () => {
  const action = toggleFavorite(1);

  expect(action).toEqual({ type: "TOGGLE_FAVORITE", id: 1 });
});

test("reducer should return initial state", () => {
  expect(reducer(undefined, {})).toEqual([]);
});

test("reducer should toggle a favorite pet", () => {
  const action = toggleFavorite(1);
  let state = [];

  expect(reducer(state, action)).toEqual([1]);

  state = [1];
  expect(reducer(state, action)).toEqual([]);

  state = [2, 1, 3];
  expect(reducer(state, action)).toEqual([2, 3]);
});
