import os
import sys
import pika
import resend
import json
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.environ['RESEND_API_KEY']


def enviar_email(email):
    params: resend.Emails.SendParams = {
        "from": "Acme <onboarding@resend.dev>",
        "to": [email],
        "subject": 'Hello from resend',
        "html": "<h1>Bem Vindo!</h1><p>Seu usuário foi registrado com sucesso em nosso sistema!</p>",
        "text": "Bem Vindo! Seu usuário foi registrado com sucesso em nosso sistema!",
    }

    resend.Emails.send(params)


def main():
    connection = pika.BlockingConnection(
        pika.URLParameters("amqp://admin:admin@localhost:5672/")
    )
    channel = connection.channel()

    channel.queue_declare(queue="register")

    def callback(ch, method, properties, body):
        data = json.loads(body)

        enviar_email(data['email'])
        print("Email enviado com sucesso!")

    channel.basic_consume(
        queue="register",
        on_message_callback=callback,
        auto_ack=True,
    )

    print(" [*] Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
