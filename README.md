# Avery Free AI Background Remover

Production-oriented MVP for `/software/background-remover`. The page accepts JPG, PNG, and WEBP images up to 25MB, sends them to a server-only Cloudinary integration, waits for real AI background-removal status, and returns a transparent PNG for comparison and download.

## Local development

Requirements: Node.js 22.13 or newer and a Cloudinary account with AI Background Removal enabled.

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000/software/background-remover`.

## Cloudinary setup

Set these server-only values in `.env.local` and in the Vercel project environment:

```text
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

The API secret is never sent to the browser. `lib/cloudinary.ts` uses the Cloudinary Node SDK and requests `background_removal: "cloudinary_ai"`. The Cloudinary AI Background Removal feature/add-on must be enabled for the account. Some accounts or Cloudinary plans expose a different removal mode; change only this service module if the account-specific integration differs.

The server polls Cloudinary resource status and returns success only when Cloudinary reports completion. It does not simulate completed AI processing.

## Retention and cleanup

Uploads use the `avery-background-remover` Cloudinary folder. The client should call `POST /api/remove-background/cleanup` with `{ "publicId": "..." }` after a user resets or after an application-defined retention window. Configure a Cloudinary lifecycle/administrative cleanup policy for defense in depth. Update `NEXT_PUBLIC_IMAGE_RETENTION_COPY` so visible privacy copy exactly matches the production policy.

This MVP includes a cleanup endpoint but does not automatically delete immediately after processing because the processed asset must remain available for comparison and download.

## Commands

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Playwright uses a mocked `/api/remove-background` response for the happy path. It does not consume Cloudinary credits.

## Vercel deployment

1. Import the repository into Vercel.
2. Add all three Cloudinary secrets to the project environment.
3. Set the optional retention-copy variable if needed.
4. Deploy with the standard Next.js preset.
5. Verify the Cloudinary add-on with a non-sensitive test image in production.

The upload route uses the Node.js runtime and a 60-second maximum duration. Confirm the selected Vercel plan supports the required function duration and body size for 25MB uploads.

## Security notes

- Browser uploads cannot submit arbitrary remote URLs.
- MIME type, size, and file signatures are validated on both client and server.
- Filenames are sanitized and raw image data is never logged.
- Basic in-memory IP rate limiting is included as an adapter. Replace it with a shared store before high-scale or adversarial production traffic.
- CSP and common hardening headers are configured in `next.config.ts`.

## Avery production TODOs

- Replace placeholder footer/product links with final Avery URLs.
- Replace CSS use-case illustrations with approved Avery product imagery and alt text.
- Confirm legal privacy/retention language and Cloudinary deletion schedule.
- Connect `avery:analytics` events in `lib/analytics.ts` to GA4 or Adobe Analytics.
