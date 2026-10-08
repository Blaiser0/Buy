"""Generate and independently decode the catalog QR. No network requests."""
from pathlib import Path
import sys
import tempfile

sys.path.insert(0, str(Path(tempfile.gettempdir()) / "buyu-qr-tools"))
import qrcode
import zxingcpp
from PIL import Image

destination = "https://www.buyubeauty.pe/catalogo"
output = Path(__file__).resolve().parents[1] / "public" / "qr-buyubeauty-catalogo.png"
qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=24, border=4)
qr.add_data(destination)
qr.make(fit=True)
qr.make_image(fill_color="black", back_color="white").save(output)
decoded = zxingcpp.read_barcode(Image.open(output))
assert decoded and decoded.text == destination, "QR verification failed"
print(f"QR verificado: {destination}")
print(output)
