FROM nginx:alpine
LABEL maintainer=docker-maint@nginx.com
ENV NGINX_VERSION=1.21.1
ENV NJS_VERSION=0.6.1
ENV PKG_RELEASE=1
# ENTRYPOINT ["/docker-entrypoint.sh"]
# EXPOSE 80
# STOPSIGNAL SIGQUIT
# CMD ["nginx" "-g" "daemon off;"]