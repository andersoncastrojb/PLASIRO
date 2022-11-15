from emailSend import EmailSend


def emailNewCiteFuntion(day, month, year, hours, name, email, phone, mode, description, nameTutor, valorP, location):
    
    hourStr = ""
    for hour in hours:
        hourStr = hourStr+ " " + hour 
        
    if mode == "modeV":
        modeOut = "Virtual"
    else:
        modeOut = "Presencial"
    
    msg = (
    "Acaba de solicitar una monitoria académica en PLASIRO,\nPara el "
    + day + "/" + month + "/"+ year + ", En las horas: [" + hourStr + " ]"
    + "\nSu información personal es:" + "\nNombre: " + name
    + "\nCorreo: " + email + "\nNúmero de celular: " + phone
    + "\nInformación de la monitoria:" + "\nModalidad: " + modeOut
    + "\nDescripción: " + description + "\nNombre del monitor: " + nameTutor
    + "\nValor a pagar: " + valorP + "\nDirección de residencia: " + location
    )
    subject = "¡Nueva solicitud de monitoria!"
    EmailSend(email, subject, msg)
    
# emailNewCiteFuntion("15", "11", "2022", ["7:00", "8:00"], "pepito", "pepito@gmail.com", "3425678909", "modeV", "description", "nameTutor", "valorP", "location")