#!/usr/bin/env sh

find '/usr/share/nginx/html/' -name '*.js' -exec sed -i -e 's,API_BASE_HOST,'"$API_BASE_HOST"',g' {} \;
find '/usr/share/nginx/html/' -name '*.js' -exec sed -i -e 's,API_BASE_PORT,'"$API_BASE_PORT"',g' {} \;
nginx -g "daemon off;"