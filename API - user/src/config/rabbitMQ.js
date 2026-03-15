const amqp = require('amqplib')

const rabbit = {
    send: async (queue, message) => {
        try {
            const connection = await amqp.connect(process.env.RABBIT_URL)
            const channel = await connection.createChannel()

            await channel.assertQueue(queue, { durable: false })

            channel.sendToQueue(
                queue,
                Buffer.from(JSON.stringify(message)),
                { persistent: false }
            )

            // Aguardar um pouco antes de fechar
            await new Promise(resolve => setTimeout(resolve, 500))

            await channel.close()
            await connection.close()
            return true
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = rabbit