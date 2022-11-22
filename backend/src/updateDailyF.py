from bson import ObjectId


def UpdateDailyF(data, db, db6):
    
    # stateDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]
    
    # Para actualizar los datos en la tabla “daily” 
    db6.update_one( {'_id': ObjectId('637cdaaaee69b119128da357')} , { "$set": {
        'dateNow': data['dateNow'],
        'diff': data['diff'],
        'dayWeek': data['dayWeek'],
        } } )
    for doc in db.find():
        
        daysHours = doc['daysHours']
        DaysWeek = [daysHours[6], daysHours[0], daysHours[1], daysHours[2], daysHours[3], daysHours[4], daysHours[5]]
        dayWeek = data['dayWeek']
        stateDays = doc['stateDays'] 
        
        for i in range(data['diff']):
            for k in range(len(stateDays)-1):
                stateDays[k] = stateDays[k+1]
            stateDays[39] = DaysWeek[dayWeek]
            if dayWeek == 6:
                dayWeek = 0
            else:
                dayWeek +=1
        # print(stateDays)
        
        db.update_one( {'_id': ObjectId( doc['_id'] )} , { "$set": { 'stateDays': stateDays } } )