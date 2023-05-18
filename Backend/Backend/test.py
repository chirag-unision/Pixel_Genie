import functions
from PIL import Image, ImageDraw,ImageFont
from rembg import remove

img = remove(Image.open("created/default.webp"))
# img.convert("RGBA")
img.save("Test picture.webp")
