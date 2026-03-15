const { send } = require('../config/rabbitMQ')

const user_register = {
    register: async function (req, res) {
        const { email, senha } = req.body;

        try {
            const message = { email, senha }
            await send('register', message)
            return res.status(201).json({ 'message': "Usuário criado com sucesso!" })
        } catch (error) {
            return res.status(500).json({ 'error': error.message })
        }
    }
}

module.exports = user_register