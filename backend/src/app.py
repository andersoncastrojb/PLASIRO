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
# Para poder hacer peticiones entre los servidores Front End(React Js) y Backend (Flask), se utiliza la configuración CORS, para el caso de producción se quita esta configuración
CORS(app)

# Database
db = mongo.db.tutors

# Para almacenar los datos de un tutor, mediantes un POST en el aplicativo web
@app.route('/tutors', methods=['POST'])
def createTutor():

    data = request.json
    try:
        # Para crear un vector con los 40 días a partir del actual, con sus respectivas disponibilidades. 
        stateDays = storeDaysTutor([data['monday'],
                        data['tuesday'],
                        data['wednesday'],
                        data['thursday'],
                        data['friday'],
                        data['saturday'],
                        data['sunday']])
        # Para almacenar los datos en la tabla “tutors” 
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


# Para obtener la información de todos los tutores registrados en el sistema 
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


# Para obtener los Ids (identificadores) de los objetos que contienen la información de cada monitor en la base de datos
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


# Para obtener la información de un tutor específico, enviando su Id
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


# Para eliminar la información de un tutor específico, enviando su Id
@app.route('/tutors/<id>', methods=['DELETE'])
def deleteUser(id):
    try:
        db.delete_one({'_id': ObjectId(id)})
        return jsonify({'message': 'User Deleted'})
    except:
        return jsonify({'message': 'Error'})


# Para modificar la información de un tutor específico, aún falta realizar el código
@app.route('/users/<id>', methods=['PUT'])
def updateUser():
    return "received"


# Para ejecutar la aplicación en el Back End
if __name__ == "__main__":
    app.run(debug=True)