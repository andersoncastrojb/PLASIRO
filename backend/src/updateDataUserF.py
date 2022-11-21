from bson import ObjectId

def UpdateDataUserF(id, data, db3):
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