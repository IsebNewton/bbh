FROM node:14-alpine AS backend
WORKDIR /usr/src/app/
COPY backend/ ./
RUN npm ci && npm run build

FROM node:14-alpine AS frontend
WORKDIR /usr/src/app/
COPY frontend/ ./
RUN npm ci && npm run build

FROM node:14-alpine
WORKDIR /usr/src/app/
COPY --from=backend /usr/src/app/dist/ ./backend/
COPY --from=frontend /usr/src/app/dist/ ./frontend/
COPY data/ ./data/
RUN ls

EXPOSE 8080

CMD ["node", "./backend/index.js"]