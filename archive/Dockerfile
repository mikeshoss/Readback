# Serves the pre-built static site from ./dist.
#
# Build the site on the host first (`npm run build`), then this image just
# serves it. Uses the locally-available alpine base so the image builds
# without pulling anything from Docker Hub — this machine currently has no
# registry access, and a static site doesn't need a Node runtime anyway.
FROM alpine:latest
RUN apk add --no-cache darkhttpd
COPY dist /site
EXPOSE 80
# --no-listing: don't expose directory indexes.
CMD ["darkhttpd", "/site", "--port", "80", "--no-listing", "--index", "index.html"]
