from datetime import datetime
"""
vector = [ 
[0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],
[0,1,0,1,0,0,0,1,1,0,1,0,1,1,0,0],
[0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],
[0,1,0,1,0,0,0,1,1,0,1,0,1,1,0,0],
[0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],
[0,1,0,1,0,0,0,1,1,0,1,0,1,1,0,0],
[0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0]
]"""

def storeDaysTutor(vector):
    date = datetime.now()
    # Day week 
    day = date.weekday()
    
    stateDays = [
        [],[],[],[],[], [],[],[],[],[],
        [],[],[],[],[], [],[],[],[],[],
        [],[],[],[],[], [],[],[],[],[],
        [],[],[],[],[], [],[],[],[],[]
        ]
    
    for i in range(0,len(stateDays),1):
        if day == 0:
            stateDays[i] = vector[0]
        if day == 1:
            stateDays[i] = vector[1]
        if day == 2:
            stateDays[i] = vector[2]
        if day == 3:
            stateDays[i] = vector[3]
        if day == 4:
            stateDays[i] = vector[4]
        if day == 5:
            stateDays[i] = vector[5]
        if day == 6:
            stateDays[i] = vector[6]
        if day < 6:
            day = day+1
            continue
        if day == 6:
            day = 0
            
    return(stateDays)
        

# print(storeDaysTutor(vector))

