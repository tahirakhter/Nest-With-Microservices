FROM node:18-bullseye-slim AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-bullseye-slim AS runtime
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /usr/src/app/dist ./dist
USER node
EXPOSE 3001
CMD ["node", "dist/main"]