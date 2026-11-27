# One-off database diagnostic for the analytics service.
FROM node:22-alpine
WORKDIR /app
RUN npm init -y >/dev/null && npm install --silent pg@8 bcryptjs@3
COPY tools/dbcheck.cjs /app/dbcheck.cjs
CMD ["node", "/app/dbcheck.cjs"]
