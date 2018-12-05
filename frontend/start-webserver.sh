#!/bin/bash

xdg-open http://localhost:8000 &

echo ""
echo "==== ---- ====="
echo ""
echo "Press CTRL+C to stop the Web-Server"
echo ""
echo "==== ---- ====="
echo ""
python -m SimpleHTTPServer
