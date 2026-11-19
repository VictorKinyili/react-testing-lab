import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../components/App";

const initialTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Paycheck from Bob's Burgers",
    category: "Income",
    amount: 1000,
  },
];

const createdTransaction = {
  id: 2,
  date: "2024-01-20",
  description: "Coffee at Java",
  category: "Food",
  amount: -4.5,
};

describe("Add Transactions", () => {
  beforeEach(() => {
    global.fetch = vi.fn((url, options) => {
      if (options && options.method === "POST") {
        return Promise.resolve({
          json: () => Promise.resolve(createdTransaction),
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve(initialTransactions),
      });
    });
  });

  it("adds new transaction to frontend and calls POST request on submit", async () => {
    render(<App />);

    await screen.findByText("Paycheck from Bob's Burgers");

    fireEvent.change(screen.getByPlaceholderText(/Description/i), {
      target: { value: "Coffee at Java" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Category/i), {
      target: { value: "Food" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Amount/i), {
      target: { value: "-4.5" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Transaction/i }));

    // Verify new transaction renders in the DOM
    expect(await screen.findByText("Coffee at Java")).toBeInTheDocument();

    // Verify POST request was triggered
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/transactions"),
      expect.objectContaining({
        method: "POST",
      })
    );
  });
});