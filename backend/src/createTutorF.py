from storeDaysTutor import storeDaysTutor

def CreateTutorF(data, db, db5):
    
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
    })
    
    # Para almacenar los datos en la tabla “comments" 
    db5.insert_one({
        "idTutor": str(id.inserted_id),
        "names": [],
        "comments": [],
        "qualifications": data["punctuation"]
        
    })