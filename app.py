import pickle
from flask import Flask, request
from sentence_transformers import SentenceTransformer, util
import os

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, Flask!"


@app.route("/test", methods=['GET', 'POST'])
def test():
  model = SentenceTransformer('sentence-transformers/msmarco-MiniLM-L-6-v3')

  content = request.json
  print(content)

  with open("state.bin", "rb") as f: # "rb" because we want to read in binary mode
    state = pickle.load(f)

  print(state)
  print('-------state--------')

  inputEncoded = model.encode(content['search'])

  bestScore = -1
  bestResult = None

  for key, value in state.items():
    print(key, value)
    # for document in value["embeddings"]: # should be all sentences in a piece of saved content
      # print(document, "DOCUMENT")
    for sentence in util.pytorch_cos_sim(value["embeddings"], inputEncoded):
      score = sentence[0].item()
      print(score, "SCORE")
      if score > bestScore:
        bestScore = score
        bestResult = state[key]["content"]

    print(bestScore, "RESULT")
    print(bestResult)

  response_body = {
    "search": bestResult
  }
  return response_body



@app.route("/upload", methods=['POST'])
def upload():
  model = SentenceTransformer('sentence-transformers/msmarco-MiniLM-L-6-v3')

  posted = request.json
  print(posted)
  filename = "/state.bin"
  os.makedirs(os.path.dirname(filename), exist_ok=True)
  with open("state.bin", "rb") as f:
    state = pickle.load(f)

  state[posted['name']] = {"content": posted['content'], "embeddings": model.encode(posted['content'])}
  print(state, "state")
  with open('state.bin', 'wb') as f:
    pickle.dump(state, f)

  return {'status': 200}

