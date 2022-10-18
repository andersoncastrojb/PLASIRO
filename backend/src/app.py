from crypt import methods
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId

app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb://localhost:27017/pythonreactdb"
mongo = PyMongo(app)


# Settings
# CORS(app)

# Database
db = mongo.db.tutors

@app.route('/tutors', methods=['POST'])
def createTutor():

    data = request.json
    try:
        db.insert_one({
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
            'monday': data['monday'],
            'tuesday': data['tuesday'],
            'wednesday': data['wednesday'],
            'thursday': data['thursday'],
            'friday': data['friday'],
            'saturday': data['saturday'],
            'sunday': data['sunday'],
            'comments': data['comments']
        })
        return jsonify({'message': 'Received'})
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
                'monday': doc['monday'],
                'tuesday': doc['tuesday'],
                'wednesday': doc['wednesday'],
                'thursday': doc['thursday'],
                'friday': doc['friday'],
                'saturday': doc['saturday'],
                'sunday': doc['sunday'],
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
            'monday': tutor['monday'],
            'tuesday': tutor['tuesday'],
            'wednesday': tutor['wednesday'],
            'thursday': tutor['thursday'],
            'friday': tutor['friday'],
            'saturday': tutor['saturday'],
            'sunday': tutor['sunday'],
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