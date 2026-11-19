import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../components/App";

const mockTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Paycheck from Bob's Burgers",
    category: "Income",
    amount: 1000,
  },
  {
    id: 2,
    date: "2024-01-16",
    description: "South by Southwest Quinoa Bowl",
    category: "Food",
    amount: -10.55,
  },
];

describe("Display Transactions", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
      })
    );
  });

  it("displays transactions on startup", async () => {
    render(<App />);

    expect(
      await screen.findByText("Paycheck from Bob's Burgers")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("South by Southwest Quinoa Bowl")
    ).toBeInTheDocument();
  });
});