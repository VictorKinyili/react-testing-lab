import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../../components/App";

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
    description: "Sunglasses",
    category: "Fashion",
    amount: -25,
  },
];

describe("Search and Sort Transactions", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
      })
    );
  });

  it("updates displayed transactions when search change event is triggered", async () => {
    render(<App />);

    await screen.findByText("Paycheck from Bob's Burgers");
    expect(screen.getByText("Sunglasses")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(
      /Search your Recent Transactions/i
    );

    fireEvent.change(searchInput, { target: { value: "Sunglasses" } });

    expect(screen.getByText("Sunglasses")).toBeInTheDocument();
    expect(
      screen.queryByText("Paycheck from Bob's Burgers")
    ).not.toBeInTheDocument();
  });
});