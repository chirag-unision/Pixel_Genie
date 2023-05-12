from flask import *
import functions
import base64
import codecs
import json
from PIL import Image
from flask_cors import CORS

headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
  'Access-Control-Allow-Credentials': True,
  'Access-Control-Allow-Origin': '*',
  'X-Requested-With': '*'
}

app = Flask(__name__)
#allow cross origin requests
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/', methods=['GET'])
def home():
  try:
    prompt = request.args.get('prompt').replace("+", " ")
  except:
    return json.dumps("Welcome to The Page")
  print(prompt)
  if functions.describe(prompt):  
    functions.getdefault(prompt,Image.open("created/image.png"))

    file1 = open("created/default.webp", 'rb').read()
    file2 = open("created/image.png", 'rb').read()
    file3 = open("created/text.png", 'rb').read()

    file1 = base64.b64encode(file1)
    file2 = base64.b64encode(file2)
    file3 = base64.b64encode(file3)

    response = make_response()
    response.headers['status'] = True
    response.data = json.dumps({
      "default": file1.decode(),
      "image": file2.decode(),
      "text": file3.decode()
    })
    return response


@app.route('/update', methods=['GET'])
def update():
  try:
    x,y = request.args.get('cordinates').split("-")
    buf = request.args.get('img')
    prompt = request.args.get('prompt').replace("+"," ")
  except:
    return json.dumps("Welcome to The Page")
  print(x,y)
  msg = io.BytesIO(base64.b64decode(buf))
  img = Image.open(msg)

  if functions.getdefault(prompt,img,x,y):
    
    file1 = open("created/default.webp", 'rb').read()
    file1 = base64.b64encode(file1)

    response = make_response()
    response.headers['status'] = True
    response.data = json.dumps({
      "default": file1.decode(),
    })
    return response


if __name__ == '__main__':
  app.run(host='0.0.0.0')
