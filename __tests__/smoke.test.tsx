import { render, screen } from "@testing-library/react";

// Mock the hook before importing the component
jest.mock("../src/hooks/useSupabaseSession", () => ({
  useSupabaseSession: () => null, // simulate logged out
}));

import Home from "../src/app/page";

describe("Smoke Test", () => {
  it("renders the landing page", () => {
    render(<Home />);
    expect(screen.getByText("Dental SaaS Starter")).toBeInTheDocument();
  });
});
