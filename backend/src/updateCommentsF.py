from bson import ObjectId

def UpdateCommentsF(id, data, db5):
    objComment = {}
    objComment = db5.find_one({'idTutor': str(ObjectId(id))})
    dates = objComment['date']
    dates.append(data['date'])
    names = objComment['names']
    names.append(data['name'])
    comments = objComment['comments']
    comments.append(data['comment'])
    quantitation = ( float(objComment['qualifications']) + float(data['quantitation']) ) / 2
    
    db5.update_one( {'idTutor': str(ObjectId(id))} , { "$set": {
        'date': dates,
        'names': names,
        'comments': comments,
        'qualifications': str(quantitation)
        } } )