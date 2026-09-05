#!/usr/bin/env python3
"""Local preview server for the DPDT portal.

Mirrors the Vercel deployment behaviour (vercel.json cleanUrls + rewrites):
  /            -> index.html
  /verify      -> verify.html
  /verify.html -> verify.html
  /index.html  -> index.html
Any other path: if it matches an existing .html file, serve it (cleanUrls);
otherwise serve the static file, or fall back to index.html so the
client-side portal routes (/acts/..., /statistics/..., ...) work on reload.

Usage:
  python3 serve.py [port]
"""

import os
import sys
import mimetypes
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))


def resolve(path):
    """Map a request path to a file on disk (Vercel-style rewrites)."""
    path = path.split("?", 1)[0].split("#", 1)[0]
    if path in ("", "/"):
        return "index.html"
    path = path.lstrip("/")

    if path == "verify":
        return "verify.html"
    if path == "index":
        return "index.html"
    if path in ("online-application", "about"):
        return "index.html"

    candidate = os.path.join(ROOT, path)
    if os.path.isfile(candidate):
        return path

    # cleanUrls: /foo -> foo.html
    html_candidate = os.path.join(ROOT, path + ".html")
    if os.path.isfile(html_candidate):
        return path + ".html"

    # SPA fallback: internal portal routes (e.g. /acts/...) load index.html
    return "index.html"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        target = resolve(self.path)
        if target is None:
            self.send_error(404, "Not Found")
            return
        self.path = "/" + target
        super().do_GET()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"DPDT portal preview running at http://localhost:{port}")
    print("Routes: /  |  /verify  |  /verify?reg_no=261029")
    server.serve_forever()


if __name__ == "__main__":
    main()
