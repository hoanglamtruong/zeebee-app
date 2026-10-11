#!/usr/bin/env bash
# Đóng gói zQR Offline thành 1 file HTML tự chứa (nhúng thư viện qr-code-styling, MIT) — chạy không cần mạng.
# Dùng: ./build.sh [đường_dẫn_qr-code-styling.js]   → tạo dist/zQR-Offline.html
set -euo pipefail
cd "$(dirname "$0")"
LIB="${1:-/home/zang/work/zqr/node_modules/qr-code-styling/lib/qr-code-styling.js}"
mkdir -p dist
python3 - "$LIB" <<'EOF'
import sys
lib = open(sys.argv[1], encoding="utf-8").read().replace("</script", "<\\/script")
src = open("src.html", encoding="utf-8").read()
assert "/*__QR_LIB__*/" in src
open("dist/zQR-Offline.html", "w", encoding="utf-8").write(src.replace("/*__QR_LIB__*/", lib))
EOF
cp HUONG-DAN.txt dist/
echo "OK: $(du -h dist/zQR-Offline.html | cut -f1) dist/zQR-Offline.html"
