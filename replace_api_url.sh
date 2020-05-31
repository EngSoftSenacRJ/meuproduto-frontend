#!/usr/bin/env sh

find '/usr/share/nginx/html/' -name '*.js' -exec sed -i -e 's,API_BASE_HOST,'"$1"',g' {} \;
find '/usr/share/nginx/html/' -name '*.js' -exec sed -i -e 's,API_BASE_PORT,'"$2"',g' {} \;
nginx -g "daemon off;"