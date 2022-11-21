from bson import ObjectId

def GetTutorsF(db, db5):
    tutors = []
    objComment ={}
    for doc in db.find():
        
        objComment = db5.find_one({'idTutor': str(ObjectId(doc['_id']))})
        # print(objComment['comments'])
        
        tutors.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'mail': doc['mail'],
            'modeV': doc['modeV'],
            'modeP': doc['modeP'],
            'price': doc['price'],
            'subjects': doc['subjects'],
            'description': doc['description'],
            'masteryOfTopics': doc['masteryOfTopics'],
            'stateDays': doc['stateDays'],
            'image': doc['image'],
            'comments': objComment['comments'],
            'punctuation': objComment['qualifications'],
            'namesQ': objComment['names']
        })
        
    return(tutors)