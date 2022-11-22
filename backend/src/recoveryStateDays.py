"""
data = ['7:00','8:00','9:00','10:00','11:00',
    '12:00','13:00','14:00','15:00','16:00',
    '17:00','18:00', '19:00', '20:00', '21:00', '22:00']
"""

# Para regresar horas disponibles en caso de rechazar la agenda
def RecoveryStateDays(stateDays, dataIn):
    # stateDays = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    
    for data in dataIn:
        if data == '7:00':
            stateDays[0] = 1
        if data == '8:00':
            stateDays[1] = 1
        if data == '9:00':
            stateDays[2] = 1
        if data == '10:00':
            stateDays[3] = 1
        if data == '11:00':
            stateDays[4] = 1
        if data == '12:00':
            stateDays[5] = 1
        if data == '13:00':
            stateDays[6] = 1
        if data == '14:00':
            stateDays[7] = 1
        if data == '15:00':
            stateDays[8] = 1
        if data == '16:00':
            stateDays[9] = 1
        if data == '17:00':
            stateDays[10] = 1
        if data == '18:00':
            stateDays[11] = 1
        if data == '19:00':
            stateDays[12] = 1
        if data == '20:00':
            stateDays[13] = 1
        if data == '21:00':
            stateDays[14] = 1
        if data == '22:00':
            stateDays[15] = 1
    
    return(stateDays)