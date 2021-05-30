from flask import Blueprint, jsonify, g
from flask_expects_json import expects_json

evaluate = Blueprint('evaluate', __name__)

base_offer = 5000
questions = [
    {"key": "ques1", "question": "Are you a permanent resident in the United States?", "answer": 5000},
    {"key": "ques2", "question": "Are you a working professional?", "answer": 5000},
    {"key": "ques3", "question": "Are you an active smoker?", "answer": -2000},
    {"key": "ques4", "question": "Have you met with an accident in last 5 years?", "answer": -1000},
    {"key": "ques5", "question": "Have you been diagnosed with any serious illnesses in the last 5 years?", "answer": -750},
    {"key": "ques6", "question": "Have you been convicted of any crime in the last 10 years?", "answer": -750},
    {"key": "ques7", "question": "Have you been charged with any speeding tickets in the last 3 years?", "answer": -500}
]


evaluate_schema = {
    'type': 'object',
    'properties': {
        'ques1': {'type': 'string', "pattern": "^(?:Yes|No)$"},
        'ques2': {'type': 'string', "pattern": "^(?:Yes|No)$"},
        'ques3': {'type': 'string', "pattern": "^(?:Yes|No)$"},
        'ques4': {'type': 'string', "pattern": "^(?:Yes|No)$"},
        'ques5': {'type': 'string', "pattern": "^(?:Yes|No)$"},
        'ques6': {'type': 'string', "pattern": "^(?:Yes|No)$"},
        'ques7': {'type': 'string', "pattern": "^(?:Yes|No)$"}
    },
    'required': ["ques1", "ques2", "ques3", "ques4", "ques5", "ques6", "ques7"]
}


@evaluate.route("/evaluate", methods=['POST'])
@expects_json(evaluate_schema)
def register():
    sum = base_offer
    data = g.data
    for ques in questions:
        key = ques['key']
        evaluationValue = ques['answer']
        answer = data[key]
        sum += evaluationValue if answer == 'Yes' else 0

    return jsonify(sum=sum), 200


@evaluate.route("/questions", methods=['GET'])
def question():
    question_to_ask = list(
        map(lambda x: {"question": x['question'], "key": x['key']}, questions))
    return jsonify(questions=question_to_ask), 200
