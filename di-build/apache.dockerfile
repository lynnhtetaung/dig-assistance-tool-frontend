FROM httpd:latest
CMD ["bash"]
ENV HTTPD_PREFIX=/usr/local/apache2
ENV PATH=/usr/local/apache2/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
STOPSIGNAL SIGWINCH
EXPOSE 80
CMD ["httpd-foreground"]