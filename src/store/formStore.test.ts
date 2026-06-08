import { useFormStore } from "./formStore";

test("adds submission to history", () => {
  useFormStore.setState({ history: [] });

  useFormStore.getState().addToHistory({
    name: "Ivan",
    email: "ivan@test.com",
    age: 25,
  });

  expect(useFormStore.getState().history.length).toBe(1);
});