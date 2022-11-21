from bson import ObjectId

def GetNewTutorsF(db4):
    users = []
    for doc in db4.find():
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
    return(users)