from bson import ObjectId

def GetCitesF(db2):
    
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
            'location': doc['location'],
            'hours': doc['hours']
        })
    
    return(cites)