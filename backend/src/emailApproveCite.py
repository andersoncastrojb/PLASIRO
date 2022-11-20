from emailSend import EmailSend


def EmailApproveCiteFuntion(day, month, year, hours, name, email, phone, mode, description, nameTutor, valorP, location):
    
    hourStr = ""
    for hour in hours:
        hourStr = hourStr+ " " + hour 
        
    if mode == "modeV":
        modeOut = "Virtual"
    else:
        modeOut = "Presencial"
    
    msg = (
    "A sido aprobada su monitoria académica en PLASRIO,\nPara el "
    + day + "/" + month + "/"+ year + ", En las horas: [" + hourStr + " ]"
    + "\nSu información personal es:" + "\nNombre: " + name
    + "\nNúmero de celular: " + phone
    + "\nInformación de la monitoria:" + "\nModalidad: " + modeOut
    + "\nDescripción: " + description + "\nNombre del monitor: " + nameTutor
    + "\nValor pagado: " + valorP + "\nDirección de residencia: " + location
    )
    subject = "¡Su monitoria ha sido APROBADA!"
    EmailSend(email, subject, msg)
    
# EmailApproveCiteFuntion("15", "11", "2022", ["7:00", "8:00"], "pepito", "pepito@gmail.com", "3425678909", "modeV", "description", "nameTutor", "valorP", "location")