const amqp = require('amqplib')

const user_register = {
    register: async function (req, res) {
        const { email, senha } = req.body;

        try {
            const connection = await amqp.connect('amqp://admin:admin@localhost:5672')
            const channel = await connection.createChannel()

            await channel.assertQueue('register', { durable: false })

            const message = { email, senha }

            const sent = channel.sendToQueue(
                'register',
                Buffer.from(JSON.stringify(message)),
                { persistent: false }
            )

            // Aguardar um pouco antes de fechar
            await new Promise(resolve => setTimeout(resolve, 500))

            await channel.close()
            await connection.close()
            return res.status(201).json({ 'message': "Usuário criado com sucesso!" })
        } catch (error) {
            return res.status(500).json({ 'error': error.message })
        }
    }
}

module.exports = user_register