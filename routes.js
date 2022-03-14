const router = require('express').Router()
const { People, database } = require('./db/database')

router.get('/', async(req, res, next) =>{
    try{
        res.send(await People.findAll())
    }
    catch(e){
        next(e)
    }
})

router.get('/reset', async(req, res, next) =>{
    try{
        await database.sync({ force:true })
        res.send(await People.findAll())
    }
    catch(e){
        next(e)
    }
})

router.post('/', async(req, res, next)=>{
    try{
        res.send(await People.randomPerson())
    }
    catch(e){
        next(e)
    }
})

router.delete('/:id', async(req, res, next)=>{
    try{
        const person = await People.findByPk(req.params.id)
        await person.destroy()
        res.sendStatus(204)
    }
    catch(e){
        next(e)
    }
})

module.exports = router