const database = require('../models')

class TurtorsController {
    static async getAllTutors(req, res) {
        try {
            const tutors = await database.Tutor.findAll()
            if (!tutors.length) {
                return res.status(200).json({ message: 'Tutors not found.'})
            }
            return res.status(200).json(tutors)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }

    static async createTutor(req, res) {
        const newTutor = req.body
        try {
            const newTutorCreated = await database.Tutor.create(newTutor)
            return res.status(200).json(newTutorCreated)
        } catch (err) {
            return res.status(500).json(err.message)
        }
    }
}

module.exports = TurtorsController