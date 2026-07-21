import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BackgroundRemoverHero } from "./BackgroundRemoverHero";

describe("BackgroundRemoverHero", () => {
  it("renders the idle upload state", () => {
    render(<BackgroundRemoverHero />);
    expect(screen.getByRole("heading", { name: /AI background remover/i })).toBeInTheDocument();
    expect(screen.getByLabelText("Choose a JPG, PNG, or WEBP image")).toBeInTheDocument();
  });
  it("shows a recoverable error for an oversized image", async () => {
    render(<BackgroundRemoverHero />);
    const input = screen.getByLabelText("Choose a JPG, PNG, or WEBP image");
    const oversized = new File([new Uint8Array(25 * 1024 * 1024 + 1)], "huge.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [oversized] } });
    expect(await screen.findByRole("alert")).toHaveTextContent("larger than 25MB");
    expect(screen.getByRole("button", { name: "Choose another image" })).toBeInTheDocument();
  });
});
