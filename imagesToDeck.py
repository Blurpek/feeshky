import sys
import glob
import base64
from pathlib import Path
import jsonpickle

class Prompt:
    def __init__(self, text):
        self.text = text

class Answer:
    def __init__(self, image):
        self.image = image

class Deck:
    def __init__(self, name, cards):
        self.name = name
        self.cards = cards



def make_deck_out_of_images(path, name, reverse=False):
    images = []
    names = []
    cards = []

    files = glob.glob(path + '/*.png')
    files.extend(glob.glob(path + '/*.jpg'))
    files.extend(glob.glob(path + '/*.jpeg'))

    for img in files:
        with open(img, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
            names.append(Path(img).stem)
            images.append(encoded_string)

    for i in range(len(names)):
        prompt = Prompt(names[i])
        answer = Answer(images[i])
        cards.append([answer, prompt] if reverse else [prompt, answer])

    deck = Deck(name, cards)

    print(len(deck.cards))

    s = jsonpickle.encode(deck, False, False)

    f = open(name + ".json","w+")
    f.write(s)


if __name__ == "__main__":
    make_deck_out_of_images(sys.argv[1], sys.argv[2], sys.argv[3] == '--reverse')


# print(base64.b64encode(cv_img[0]))