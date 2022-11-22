from crypt import methods
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
from recoveryStateDays import RecoveryStateDays

# Funciones Https
from createTutorF import CreateTutorF
from getTutorsF import GetTutorsF
from approveChangeTutorInfoF import ApproveChangeTutorInfoF
from createCitesF import CreateCitesF
from getCitesF import GetCitesF
from getUsersF import GetUsersF
from createUserF import CreateUserF
from createNewTutorF import CreateNewTutorF
from updateDataUserF import UpdateDataUserF
from getNewTutorsF import GetNewTutorsF
from updateCommentsF import UpdateCommentsF
from deleteCiteF import DeleteCiteF


app = Flask(__name__)
# app.config['MONGO_URI'] = "mongodb://localhost:27017/pythonreactdb"
app.config['MONGO_URI'] = "mongodb+srv://andersoncastrojb:rjkwXWJ9z4ny0D7w@plasiro.mqkr4ji.mongodb.net/pythonreactdb"
mongo = PyMongo(app)


# Settings
# Para poder hacer peticiones entre los servidores Front End(React Js) y Backend (Flask), se utiliza la configuración CORS, para el caso de producción se quita esta configuración
CORS(app)

# Database tutors
db = mongo.db.tutors
# Database cites
db2 = mongo.db.cites
# Database users
db3 = mongo.db.users
# Database new_tutor
db4 = mongo.db.new_tutor
# Database comments
db5 = mongo.db.comments


# Para almacenar los datos de un tutor, mediantes un POST en el aplicativo web
@app.route('/tutors', methods=['POST'])
def createTutor():
    data = request.json
    try:
        CreateTutorF(data, db, db5)
        return jsonify({'message': 'Received'})
    except:
        return jsonify({'message': 'Error'})


# Para obtener la información de todos los tutores registrados en el sistema 
@app.route('/tutors', methods=['GET'])
def getTutors():
    try:
        tutors = GetTutorsF(db, db5)
        return jsonify(tutors)
    except:
        return jsonify({'message': 'Error'})


# Para aceptar la modificación de la información de un tutor específico
@app.route('/tutors/<id>', methods=['POST'])
def approveChangeTutorInfo(id):
    try:
        data = request.json
        ApproveChangeTutorInfoF(data)
        return jsonify({'message': 'Updated User'})
    except:
        return jsonify({'message': 'Error'})


# Para almacenar los datos de una cita, mediante un POST en el aplicativo web
@app.route('/cites', methods=['POST'])
def createCites():
    data = request.json
    try:
        CreateCitesF(data, db, db2)
        return jsonify({'message': 'Received'})
    except:

        return jsonify({'message': 'Error'})
    
    
# Para obtener la información de todas las citas registradas en el sistema 
@app.route('/cites', methods=['GET'])
def getCites():
    try:
        cites = GetCitesF(db2)
        return jsonify(cites)
    except:
        return jsonify({'message': 'Error'})


# Para eliminar la información de de una cita específica 
@app.route('/cites/<id>', methods=['DELETE'])
def deleteCite(id):
    try:
        data = request.json
        DeleteCiteF(id, data, db, db2)                    
        return jsonify({'message': 'Cite Deleted'})
    except:
        return jsonify({'message': 'Error'})


# Para eliminar la información de de una cita específica sin enviar email de confirmación
@app.route('/cites-without-email/<id>', methods=['DELETE'])
def deleteCiteWithOutEmail(id):
    try:
        db2.delete_one({'_id': ObjectId(id)})
        return jsonify({'message': 'Cite Deleted'})
    except:
        return jsonify({'message': 'Error'})    


# Para obtener la información de todos los usuarios registrados en el sistema 
@app.route('/users', methods=['GET'])
def getUsers():
    try:
        users = GetUsersF(db3)
        return jsonify(users)
    except:
        return jsonify({'message': 'Error'})


# Para almacenar los datos de un usuario, mediante un POST en el aplicativo web
@app.route('/users', methods=['POST'])
def createUser():
    data = request.json
    out = CreateUserF(data, db3)
    return(out)


# Para almacenar los datos de un aspirante a tutor, mediante un POST en el aplicativo web
@app.route('/new_tutor', methods=['POST'])
def createNewTutor():
    data = request.json
    out = CreateNewTutorF(data, db3, db4)
    return(out)

# Para modificar la información de un usuario específico
@app.route('/users/<id>', methods=['PUT'])
def updateDataUser(id):
    try:
        data = request.json
        UpdateDataUserF(id , data, db3)
        return jsonify({ 'message': 'Updated User' })
    except:
        return jsonify({'message': 'Error', 'text': 'No se pudo actualizar el usuario'})


# Para obtener la información de todos los usuarios registrados en el sistema 
@app.route('/new_tutor', methods=['GET'])
def getNewTutors():
    
    try:
        users = GetNewTutorsF(db4)
        return jsonify(users)
    except:
        return jsonify({'message': 'Error'})


# Para eliminar la información de de una aspirante a monitor específico 
@app.route('/new_tutor/<id>', methods=['DELETE'])
def deleteNewTutor(id):
    try:
        db4.delete_one({'_id': ObjectId(id)})
        return jsonify({'message': 'New tutor Deleted'})
    except:
        return jsonify({'message': 'Error'})


# Para almacenar comentarios de un tutor específico 
@app.route('/comments/<id>', methods=['PUT'])
def updateComments(id):
    try:
        data = request.json
        UpdateCommentsF(id, data, db6)
        return jsonify({ 'message': 'Add comment' })
    except:
        return jsonify({'message': 'Error', 'text': 'No se pudo agregar el comentario'})


# Para ejecutar la aplicación en el Back End
if __name__ == "__main__":
    app.run(debug=True)