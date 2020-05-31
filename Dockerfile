FROM node:12.16.1-alpine As builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/app/dist/meuproduto /usr/share/nginx/html/
COPY replace_api_url.sh /
CMD ["sh", "/replace_api_url.sh", "18.188.164.175", "8080"]