from flask import jsonify

def CreateNewTutorF(data, db3, db4):
    
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
