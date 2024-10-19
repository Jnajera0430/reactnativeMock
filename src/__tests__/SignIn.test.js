import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { ManageFormmik } from "../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    // eslint-disable-next-line jest/expect-expect
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      render(<ManageFormmik onSubmit={onSubmit} />);
      fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
      fireEvent.press(screen.getByText("Sign in"));
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
