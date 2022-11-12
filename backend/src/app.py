from crypt import methods
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
from storeDaysTutor import storeDaysTutor

app = Flask(__name__)
# app.config['MONGO_URI'] = "mongodb://localhost:27017/pythonreactdb"
app.config['MONGO_URI'] = "mongodb+srv://andersoncastrojb:rjkwXWJ9z4ny0D7w@plasiro.mqkr4ji.mongodb.net/pythonreactdb"
mongo = PyMongo(app)


# Settings
# Para poder hacer peticiones entre los servidores Front End(React Js) y Backend (Flask), se utiliza la configuración CORS, para el caso de producción se quita esta configuración
CORS(app)

# Database tutors
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
@app.route('/tutors/<id>', methods=['PUT'])
def updateUser(id):
    try:
        data = request.json
        tutor = db.find_one({'_id': ObjectId(id)})
        
        out = tutor['stateDays']
        out[data['dayChange']] = data['hourChange']
        
        db.update_one( {'_id': ObjectId(id)} , { "$set": { 'stateDays': out } } )
        return jsonify({'message': 'Updated User', 'id': str(ObjectId(tutor['_id'])), 'out': out })
    except:
        return jsonify({'message': 'Error'})


# Database cites
db2 = mongo.db.cites


# Para almacenar los datos de una cita, mediante un POST en el aplicativo web
@app.route('/cites', methods=['POST'])
def createCites():
    data = request.json
    try:
        # Para almacenar los datos en la tabla “cites” 
        id = db2.insert_one({
            'date': data['date'],
            'day': data['day'],
            'month': data['month'],
            'year': data['year'],
            'hourSelect': data['hourSelect'],
            'daySelect': data['daySelect'],
            'name': data['name'],
            'phone': data['phone'],
            'email': data['email'],
            'mode': data['mode'],
            'description': data['description'],
            'conditions': data['conditions'],
            'idTutor': data['idTutor'],
            'nameTutor': data['nameTutor'],
            'emailTutor': data['emailTutor'],
            'priceTutor': data['priceTutor'],
            'valorP': data['valorP'],
            'location': data['location']
        })
        return jsonify({'message': 'Received', "id": str(id.inserted_id)})
    except:

        return jsonify({'message': 'Error'})
    
    
# Para obtener la información de todas las citas registradas en el sistema 
@app.route('/cites', methods=['GET'])
def getCites():
    
    try:
        cites = []
        for doc in db2.find():
            cites.append({
                '_id': str(ObjectId(doc['_id'])),
                'date': doc['date'],
                'day': doc['day'],
                'month': doc['month'],
                'year': doc['year'],
                'hourSelect': doc['hourSelect'],
                'daySelect': doc['daySelect'],
                'name': doc['name'],
                'phone': doc['phone'],
                'email': doc['email'],
                'mode': doc['mode'],
                'description': doc['description'],
                'conditions': doc['conditions'],
                'idTutor': doc['idTutor'],
                'nameTutor': doc['nameTutor'],
                'emailTutor': doc['emailTutor'],
                'priceTutor': doc['priceTutor'],
                'valorP': doc['valorP'],
                'location': doc['location']
            })
        return jsonify(cites)
    except:
        return jsonify({'message': 'Error'})


# Para eliminar la información de de una cita específica 
@app.route('/cites/<id>', methods=['DELETE'])
def deleteCite(id):
    try:
        db2.delete_one({'_id': ObjectId(id)})
        return jsonify({'message': 'Cite Deleted'})
    except:
        return jsonify({'message': 'Error'})
    

# Database users
db3 = mongo.db.users

# Para obtener la información de todos los usuarios registrados en el sistema 
@app.route('/users', methods=['GET'])
def getUsers():
    
    try:
        users = []
        for doc in db3.find():
            users.append({
                '_id': str(ObjectId(doc['_id'])),
                'date': doc['date'],
                'name': doc['name'],
                'email': doc['email'],
                'phone': doc['phone'],
                'permissions': doc['permissions'],
                'location': doc['location'],
                'age': doc['age'],
                'tipeId': doc['tipeId'],
                'numberId': doc['numberId']
            })
        return jsonify(users)
    except:
        return jsonify({'message': 'Error'})


# Para almacenar los datos de un usuario, mediante un POST en el aplicativo web
@app.route('/users', methods=['POST'])
def createUser():
    data = request.json
    # La bandera se activa en caso de haber usuarios con los mismo correos 
    sameUser = 0
    for doc in db3.find():
        if doc['email'] == data['email']:
            sameUser = 1
            
    if sameUser == 0:
        try:
            # Para almacenar los datos en la tabla “users” 
            id = db3.insert_one({
                'date': data['date'],
                'name': data['name'],
                'email': data['email'],
                'phone': data['phone'],
                'permissions': [data['rol']],
                'location': data['location'],
                'age': data['age'],
                'tipeId': data['tipeId'],
                'numberId': data['numberId']
            })
            return jsonify({'message': 'Received', "id": str(id.inserted_id)})
        except:

            return jsonify({'message': 'Error', 'text': 'No se guardaron los datos, error en el servidor'})
    else:
        return jsonify({'message': 'Error', 'text': 'Este correo ya existe, debe registrarse con uno diferente'})


# Database new_tutor
db4 = mongo.db.new_tutor

    
# Para almacenar los datos de un aspirante a tutor, mediante un POST en el aplicativo web
@app.route('/new_tutor', methods=['POST'])
def createNewTutor():
    data = request.json
    # La bandera se activa en caso de haber usuarios con los mismo correos 
    sameUser = 0
    
    for doc in db3.find():
        if doc['email'] == data['email']:
            sameUser = 1
    for doc in db4.find():
        if doc['email'] == data['email']:
            sameUser = 1
    if sameUser == 0:
        try:
            # Para almacenar los datos en la tabla “new_tutor” 
            id = db4.insert_one({
                'date': data['date'],
                'name': data['name'],
                'email': data['email'],
                'phone': data['phone'],
                'permissions': data['rol'],
                'location': data['location'],
                'age': data['age'],
                'tipeId': data['tipeId'],
                'numberId': data['numberId']
            })
            return jsonify({'message': 'Received', "id": str(id.inserted_id)})
        except:

            return jsonify({'message': 'Error', 'text': 'No se guardaron los datos, error en el servidor'})
    else:
        return jsonify({'message': 'Error', 'text': 'Este correo ya existe, debe registrarse con uno diferente'})


# Para modificar la información de un usuario específico
@app.route('/users/<id>', methods=['PUT'])
def updateDataUser(id):
    try:
        data = request.json
        print(ObjectId(id))
        db3.update_one( {'_id': ObjectId(id)} , { "$set": {
            'date': data['date'],
            'name': data['name'],
            'email': data['email'],
            'phone': data['phone'],
            'permissions': [data['rol']],
            'location': data['location'],
            'age': data['age'],
            'tipeId': data['tipeId'],
            'numberId': data['numberId']
            } } )
        
        return jsonify({ 'message': 'Updated User' })
    except:
        return jsonify({'message': 'Error', 'text': 'No se pudo actualizar el usuario'})


# Para ejecutar la aplicación en el Back End
if __name__ == "__main__":
    app.run(debug=True)