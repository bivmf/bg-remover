// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const { removeBackgroundMock } = vi.hoisted(() => ({ removeBackgroundMock: vi.fn() }));
vi.mock("@/lib/cloudinary", () => ({ removeBackground: removeBackgroundMock }));
import { POST } from "./route";

describe("POST /api/remove-background", () => {
  beforeEach(() => removeBackgroundMock.mockReset());
  it("rejects requests without an image", async () => {
    const request = new Request("http://localhost/api/remove-background", { method: "POST", body: new FormData(), headers: { "x-forwarded-for": "api-test-empty" } });
    const response = await POST(request);
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({ error: expect.stringContaining("Choose an image") });
  });
  it("returns only the client-safe processing result", async () => {
    removeBackgroundMock.mockResolvedValue({ originalUrl: "https://res.cloudinary.com/demo/original.jpg", processedUrl: "https://res.cloudinary.com/demo/processed.png", publicId: "avery-background-remover/test", width: 1200, height: 800 });
    const form = new FormData(); form.append("image", new File([new Uint8Array([0xff,0xd8,0xff,0,0,0,0,0,0,0,0,0])], "test.jpg", { type: "image/jpeg" }));
    const request = new Request("http://localhost/api/remove-background", { method: "POST", body: form, headers: { "x-forwarded-for": "api-test-success" } });
    const response = await POST(request);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ originalUrl: "https://res.cloudinary.com/demo/original.jpg", processedUrl: "https://res.cloudinary.com/demo/processed.png", publicId: "avery-background-remover/test", width: 1200, height: 800 });
  });
});
