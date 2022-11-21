from bson import ObjectId

def UpdateCommentsF(id, data, db6):
    objComment = {}
    objComment = db6.find_one({'idTutor': str(ObjectId(id))})
    names = objComment['names']
    names.append(data['name'])
    comments = objComment['comments']
    comments.append(data['comment'])
    quantitation = ( float(objComment['qualifications']) + float(data['quantitation']) ) / 2
    
    db6.update_one( {'idTutor': str(ObjectId(id))} , { "$set": {
        'names': names,
        'comments': comments,
        'qualifications': str(quantitation)
        } } )