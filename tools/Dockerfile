# One-off database diagnostic; reuses the Umami image because it ships pg and bcryptjs.
FROM ghcr.io/umami-software/umami:postgresql-latest
WORKDIR /app
COPY tools/dbcheck.js /app/dbcheck.js
CMD ["node", "/app/dbcheck.js"]
