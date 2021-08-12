import { render, screen } from "@testing-library/react";
import { ActiveLink } from "./index";

jest.mock("next/router", () => {
  return {
    useRouter: () => {
      return {
        asPath: "/",
      };
    },
  };
});

describe("Component: Active Link", () => {
  it("renders correctly", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("receive active class if href is equal asPath", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toHaveClass("active");
  });

  it("not receive active class if href is different from asPath", () => {
    render(
      <ActiveLink href="/home" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).not.toHaveClass("active");
  });
});
