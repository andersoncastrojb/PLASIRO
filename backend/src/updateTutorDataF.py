from bson import ObjectId
from storeDaysTutor import storeDaysTutor

def UpdateTutorDataF(id, data, db):
    
    # Para crear un vector con los 40 días a partir del actual, con sus respectivas disponibilidades. 
    stateDays = storeDaysTutor([data['monday'],
                    data['tuesday'],
                    data['wednesday'],
                    data['thursday'],
                    data['friday'],
                    data['saturday'],
                    data['sunday']])
    
    # Para actualizar los datos en la tabla “tutors” de un tutor especifico 
    db.update_one( {'_id': ObjectId(id)} , { "$set": {
        'name': data['name'],
        'mail': data['mail'],
        'modeV': data['modeV'],
        'modeP': data['modeP'],
        'price': data['price'],
        'subjects': data['subjects'],
        'description': data['description'],
        'masteryOfTopics': data['masteryOfTopics'],
        'stateDays': stateDays,
        'image': data['image'],
        'daysHours': [data['monday'],
                    data['tuesday'],
                    data['wednesday'],
                    data['thursday'],
                    data['friday'],
                    data['saturday'],
                    data['sunday']]
    } } )