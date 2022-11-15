import smtplib
import ssl
from email.message import EmailMessage

import os
from dotenv import load_dotenv
load_dotenv()

def EmailSend(email, subject, msg):
    
    # Define email sender and receiver
    email_sender = os.getenv('email')
    email_password = os.getenv('email_password')
    email_receiver = email

    # Set the subject and body of the email
    subject = subject
    body = msg

    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    em.set_content(body)

    # Add SSL (layer of security)
    context = ssl.create_default_context()

    # Log in and send the email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())