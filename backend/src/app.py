from crypt import methods
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
from storeDaysTutor import storeDaysTutor

app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb://localhost:27017/pythonreactdb"
mongo = PyMongo(app)


# Settings
CORS(app)

# Database
db = mongo.db.tutors

@app.route('/tutors', methods=['POST'])
def createTutor():

    data = request.json
    try:
        stateDays = storeDaysTutor([data['monday'],
                        data['tuesday'],
                        data['wednesday'],
                        data['thursday'],
                        data['friday'],
                        data['saturday'],
                        data['sunday']])
        
        id = db.insert_one({
            'name': data['name'],
            'mail': data['mail'],
            'punctuation': data['punctuation'],
            'modeV': data['modeV'],
            'modeP': data['modeP'],
            'price': data['price'],
            'subjects': data['subjects'],
            'description': data['description'],
            'masteryOfTopics': data['masteryOfTopics'],
            'titles': data['titles'],
            'stateDays': stateDays,
            'comments': data['comments']
        })
        return jsonify({'message': 'Received', "id": str(id.inserted_id)})
    except:
        return jsonify({'message': 'Error'})


@app.route('/tutors', methods=['GET'])
def getTutors():
    
    try:
        tutors = []
        for doc in db.find():
            tutors.append({
                '_id': str(ObjectId(doc['_id'])),
                'name': doc['name'],
                'mail': doc['mail'],
                'punctuation': doc['punctuation'],
                'modeV': doc['modeV'],
                'modeP': doc['modeP'],
                'price': doc['price'],
                'subjects': doc['subjects'],
                'description': doc['description'],
                'masteryOfTopics': doc['masteryOfTopics'],
                'titles': doc['titles'],
                'stateDays': doc['stateDays'],
                'comments': doc['comments']
            })
        return jsonify(tutors)
    except:
        return jsonify({'message': 'Error'})

@app.route('/tutorsIds', methods=['GET'])
def getTutorsIds():
    
    try:
        tutors = []
        for doc in db.find():
            tutors.append({
                '_id': str(ObjectId(doc['_id'])),
                'name': doc['name']
            })
        return jsonify(tutors)
    except:
        return jsonify({'message': 'Error'})


@app.route('/tutor/<id>', methods=['GET'])
def index(id):
    try:
        tutor = db.find_one({'_id': ObjectId(id)})
        return jsonify({
            '_id': str(ObjectId(tutor['_id'])),
            'name': tutor['name'],
            'mail': tutor['mail'],
            'punctuation': tutor['punctuation'],
            'modeV': tutor['modeV'],
            'modeP': tutor['modeP'],
            'price': tutor['price'],
            'subjects': tutor['subjects'],
            'description': tutor['description'],
            'masteryOfTopics': tutor['masteryOfTopics'],
            'titles': tutor['titles'],
            'stateDays': tutor['stateDays'],
            'comments': tutor['comments']
        })
    except:
        return jsonify({'message': 'Error'})


@app.route('/tutors/<id>', methods=['DELETE'])
def deleteUser(id):
    try:
        db.delete_one({'_id': ObjectId(id)})
        return jsonify({'message': 'User Deleted'})
    except:
        return jsonify({'message': 'Error'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser():
    return "received"

if __name__ == "__main__":
    app.run(debug=True)