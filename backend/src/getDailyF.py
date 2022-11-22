from bson import ObjectId

def GetDailyF(db6):
    Daily = db6.find_one({'_id': ObjectId('637cdaaaee69b119128da357')})
    return(Daily['dateNow'])