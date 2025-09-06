import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";


describe("Smoke Test", () => {
  it("renders the landing page", () => {
    render(<Home />);
    expect(screen.getByText("Dental SaaS Starter")).toBeInTheDocument();
  });
});
