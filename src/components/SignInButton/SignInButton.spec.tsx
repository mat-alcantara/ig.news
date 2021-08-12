import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useSession, signOut } from "next-auth/client";
import { SignInButton } from "./index";

jest.mock("next-auth/client");

describe("Component: SignInButton", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "John Doe", email: "johndoe@example.com" },
        expires: "fake-expires",
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  // TODO: Sign Out Button
  // it("sign out if signOut button is clicked", () => {
  //   const signOutMocked = mocked(signOut);

  //   signOutMocked.mockReturnValueOnce(undefined);

  //   const button = screen.get;

  //   fireEvent.click(screen.getByRole(''));

  //   render(<SignInButton />);
  // });
});
