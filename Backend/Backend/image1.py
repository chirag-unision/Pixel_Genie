import openai
import os

openai.api_key = "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"

response = openai.Image.create(
  prompt=input(),
  n=1,
  size="512x512",
)
image_url = response['data'][0]['url']

import urllib.request
from PIL import Image

urllib.request.urlretrieve(image_url, "created/image.png")
# os.system("curl %s -o image.png" % image_url)
# os.system("wget %s" % image_url)
