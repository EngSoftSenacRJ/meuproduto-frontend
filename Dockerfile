FROM node:12.16.1-alpine As builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/app/dist/meuproduto /usr/share/nginx/html/
COPY /nginx/conf.d/default.conf /etc/nginx/conf.d/
COPY replace_api_url.sh /
CMD ["chmod", "u=rwx", "replace_api_url.sh"]
CMD ["sh", "-c", "/replace_api_url.sh ${3.128.231.227}"]