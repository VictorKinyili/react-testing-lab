import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../../components/App";

const mockTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Zebra",
    category: "Income",
    amount: 100,
  },
  {
    id: 2,
    date: "2024-01-16",
    description: "Apple",
    category: "Food",
    amount: -10,
  },
];

describe("Sort Transactions", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
      })
    );
  });

  it("sorts transactions by description", async () => {
    render(<App />);
    await screen.findByText("Zebra");

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "description" },
    });

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Apple");
    expect(rows[2]).toHaveTextContent("Zebra");
  });
});