const database = require('../models')

class TurtorsController {
    static async getAllTutors(req, res) {
        try {
            const allTutors = await database.Tutor.findAll()
            if (allTutors.length === 0) {
                return res.status(200).json({ message: 'Tutors not found.' })
            }
            return res.status(200).json(allTutors)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    static async createTutor(req, res) {
        const newTutor = req.body
        try {
            const newTutorCreated = await database.Tutor.create(newTutor)
            return res.status(200).json(newTutorCreated)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    static async getOneTutor(req, res) {
        const { id } = req.params
        try {
            const oneTutor = await database.Tutor.findOne({ where: { id: Number(id) } })
            
            if (!oneTutor) {
                return res.status(200).json({ message: 'Tutor not found.' })
            }
            
            return res.status(200).json(oneTutor)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    static async updateManyTutorData(req, res) {
        const { id } = req.params
        const newInfo = req.body
        try {
            await database.Tutor.update(newInfo, { where: { id: Number(id) } })
            const tutorUpdated = await database.Tutor.findOne({ where: { id: Number(id) } })
            return res.status(200).json(tutorUpdated)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    static async updateOneTutorData(req, res) {
        const { id } = req.params
        const newInfo = req.body

        /* Checks if more than one property was passed in the body */
        if (Object.keys(newInfo).length > 1) {
            return res.status(200).json({ error: 'only one property is accepted to be updated with the PATCH method' })
        }

        try {
            await database.Tutor.update(newInfo, { where: { id: Number(id) } })
            const tutorUpdated = await database.Tutor.findOne({ where: { id: Number(id) } })
            
            if (!tutorUpdated) {
                return res.status(200).json({ message: 'Tutor not found.' })
            }
            
            return res.status(200).json(tutorUpdated)
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }
}

module.exports = TurtorsController