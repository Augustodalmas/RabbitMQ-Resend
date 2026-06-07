const amqp = require('amqplib')

const rabbit = {
    send: async (queue, message) => {
        try {
            const connection = await amqp.connect(process.env.RABBIT_URL)
            const channel = await connection.createChannel()

            await channel.assertQueue(queue, { durable: true })

            channel.sendToQueue(
                queue,
                Buffer.from(JSON.stringify(message)),
                { persistent: true }
            )

            await new Promise(resolve => setTimeout(resolve, 500))

            await channel.close()
            await connection.close()
            return true
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

module.exports = rabbit