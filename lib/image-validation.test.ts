// @vitest-environment node
import { describe, expect, it } from "vitest";
import { hasValidImageSignature, sanitizeFilename, validateImageFile } from "./image-validation";

describe("image validation", () => {
  it("accepts a valid PNG signature", async () => {
    const file = new File([new Uint8Array([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0,0,0,0])], "label.png", { type: "image/png" });
    await expect(validateImageFile(file)).resolves.toEqual({ valid: true });
  });
  it("rejects a MIME/signature mismatch", async () => {
    const file = new File([new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12])], "fake.png", { type: "image/png" });
    await expect(validateImageFile(file)).resolves.toMatchObject({ valid: false, code: "signature" });
  });
  it("recognizes WEBP and sanitizes filenames", () => {
    const bytes = new TextEncoder().encode("RIFF1234WEBP");
    expect(hasValidImageSignature(bytes, "image/webp")).toBe(true);
    expect(sanitizeFilename(" ../../My product (final).png ")).toBe("My-product-final-.png");
  });
});
