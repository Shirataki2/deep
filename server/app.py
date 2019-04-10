from flask import Flask, request, jsonify
import urllib3
import numpy as np
import uuid
import json


app = Flask(__name__)
y_31 = np.load("assets/y_submit.npy")


def acc(y_true, y_pred):
    tf = np.bincount((y_pred == y_true).astype(np.int32).flatten())
    if len(tf) == 2:
        return tf[1] / (tf[0] + tf[1])
    else:
        return 0


@app.route("/", methods=["GET"])
def index():
    return "Keio AIC api server"


@app.route("/3_1/run", methods=["POST"])
def run31():
    id = str(uuid.uuid4())
    data = request.json["data"]
    nam = request.json["name"]
    arr = np.frombuffer(data.encode(), dtype=np.int64)
    ac = acc(y_31, arr)
    http = urllib3.PoolManager()
    res = http.request(
        "POST",
        "https://us-central1-deep-bb702.cloudfunctions.net/postToVueServer",
        body=json.dumps({
            "uuid": id,
            "acc": ac,
            "name": nam,
            "c": "3-1"
        }),
        headers={'Content-Type': 'application/json'}
    )
    print(res.data)
    return id


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0")
