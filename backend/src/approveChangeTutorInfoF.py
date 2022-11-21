from emailApproveCite import EmailApproveCiteFuntion

def ApproveChangeTutorInfoF(data):
    
    EmailApproveCiteFuntion(data['day'], data['month'], data['year'], data['hours'],
                            data['name'], data['email'], data['phone'], data['mode'],
                            data['description'], data['nameTutor'], data['valorP'], data['location'])
    EmailApproveCiteFuntion(data['day'], data['month'], data['year'], data['hours'],
                        data['name'], data['emailTutor'], data['phone'], data['mode'],
                        data['description'], data['nameTutor'], data['valorP'], data['location'])
    