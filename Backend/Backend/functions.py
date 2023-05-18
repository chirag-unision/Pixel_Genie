from PIL import Image, ImageFont, ImageDraw
import os
import openai
import math






openai.api_key = "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"
completion = openai.Completion()

# f=r'/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f=r'C:/Windows/Font/Calibri/calibri.ttf'

prompt_text = "nothingDUDE is a meme description Discord Bot who gives a description of a funny whatsapp sticker based on the given text. \n\nFriend: get out from here\nnothingDUDE: A person throwing out another person out of the room\nFriend: when you have lost all the competitive games this year and have been demoted in valorant\nnothingDUDE: A sad face sitting infront of a computer crying and depressed with a funny ghost.\nFriend: when the teacher gives you homework but you copy all the questions from the topper\nnothingDUDE:A child with thug styled animated specs on his face, laughing on teacher.\nFriend: na chhedo hame ham sataye hue hai\nnothingDUDE: sad cute animated teddy with a disappointing gesture and tear in his eyes.\nFriend: heart touching\nnothingDUDE: an emotional looking animated dog touching diagram of human heart with human like hands.\nFriend: pain only\nnothingDUDE: depressed white animated teddy bear crying in kneeled position.\nFriend: nikal yaha se\nnothingDUDE: a person kicking out another person from the room.\nFriend: "


# Image Functions

def getwrdimg(wrd):
    size=100
    font = ImageFont.truetype(f, size)
    a, b = font.getsize(wrd)
    if a>512:
        size=int(512/a*100)
        font = ImageFont.truetype(f, size)
        a, b = font.getsize(wrd)
    print(a)
    print(b)
    img1 = Image.new("RGBA", (a + 20, b + 18), (0,0,0,0))
    x,y = (10, 9)
    ShadownColor="Yellow"
    
    ImageDraw.Draw(img1).text((x+1, y), wrd, font=font, fill=ShadownColor)
    ImageDraw.Draw(img1).text((x-1, y), wrd, font=font, fill=ShadownColor)
    ImageDraw.Draw(img1).text((x, y+1), wrd, font=font, fill=ShadownColor)
    ImageDraw.Draw(img1).text((x, y-1), wrd, font=font, fill=ShadownColor)
    ImageDraw.Draw(img1).text((x,y), wrd, font=font, fill=(0, 0, 0, 255))
    img1.save('created/text.png', quality=100)


def getdefault(wrd,img1=Image.open("created/image.png"),x=None,y=None):
    size=100
    
    font = ImageFont.truetype(f, size)
    a, b = font.getsize(wrd)
    if a>500:
        size=int((500/a)*100)
        font = ImageFont.truetype(f, size)
        a, b = font.getsize(wrd)
    print(a)
    print(b)

    if x == None and y == None:
        x,y = (256-int(a/2), 500-b)
    print(x,y)
    ShadownColor="black"
    ss=math.ceil(4*(size/100))
    ImageDraw.Draw(img1).text((x+ss, y+ss), wrd, font=font, fill=ShadownColor)
    ImageDraw.Draw(img1).text((x-ss, y-ss), wrd, font=font, fill=ShadownColor)
    ImageDraw.Draw(img1).text((x-ss, y+ss), wrd, font=font, fill=ShadownColor)
    ImageDraw.Draw(img1).text((x+ss, y-ss), wrd, font=font, fill=ShadownColor)
    ImageDraw.Draw(img1).text((x,y), wrd, font=font, fill="yellow")
    img1.save('created/default.webp', quality=100)
    getwrdimg(wrd)

#  AI Functions



def describe(question):

  prompt = prompt_text + question + "\nnothingDUDE:"
  print(prompt)
  response = openai.Completion.create(model="text-davinci-003",
                                      temperature=0.9,
                                      max_tokens=256,
                                      top_p=1,
                                      frequency_penalty=0,
                                      presence_penalty=0.6,
                                      prompt=prompt,
                                      stop=[" Friend:", " nothingDUDE:"],
                                      suffix="")
  print(response)
  cmd = 'echo "{}" | python image1.py'.format(response["choices"][0]["text"])
  print(cmd)
  os.system(cmd)
  # print("Getting Word Img on prompt :",prompt)
  # getwrdimg(prompt)
  # print("Recieved Word Img on prompt :",prompt)
  # getdefault(prompt,Image.open("created/image.png"))

  if response["choices"][0]["text"] == "":
    return False
  return True


