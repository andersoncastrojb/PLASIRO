from bson import ObjectId
from emailNewCite import emailNewCiteFuntion

def CreateCitesF(data, db, db2):
    
    # Modificar temporalmente los horarios seleccionados en la tabla “tutors”
    tutor = db.find_one({'_id': ObjectId( data['idTutor'] )})
    out = tutor['stateDays']
    out[data['daySelect']] = data['hourSelect']
    db.update_one( {'_id': ObjectId( data['idTutor'] )} , { "$set": { 'stateDays': out } } )
    
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
        'location': data['location'],
        'hours': data['hours']
    })
    emailNewCiteFuntion(data['day'], data['month'], data['year'], data['hours'],
                        data['name'], data['email'], data['phone'], data['mode'],
                        data['description'], data['nameTutor'], data['valorP'], data['location'])
    emailNewCiteFuntion(data['day'], data['month'], data['year'], data['hours'],
                        data['name'], 'ibrackmov@gmail.com', data['phone'], data['mode'],
                        data['description'], data['nameTutor'], data['valorP'], data['location'])
    