from bson import ObjectId
from emailDeleteCite import EmailDeleteCiteFuntion
from recoveryStateDays import RecoveryStateDays

def DeleteCiteF(id, data, db, db2):
    # Modificar permanentemente los horarios seleccionados en las tablas “tutors”  y "tutorsRom"
    tutor = db.find_one({'_id': ObjectId( data['idTutor'] )})
    out = tutor['stateDays']
    hour = RecoveryStateDays( data['hourSelect'], data['hours'] )
    out[data['daySelect']] = hour
    
    db.update_one( {'_id': ObjectId( data['idTutor'] )} , { "$set": { 'stateDays': out } } )
    db2.delete_one({'_id': ObjectId(id)})
    
    EmailDeleteCiteFuntion(data['day'], data['month'], data['year'], data['hours'],
                        data['name'], data['email'], data['phone'], data['mode'],
                        data['description'], data['nameTutor'], data['valorP'], data['location'])