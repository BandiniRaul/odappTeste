import express from 'express'
import  { PrismaClient }  from './generated/prisma/index.js'

const prisma = new PrismaClient()

//criando a variável "app" e colocando a biblioteca express dentro dela
const app = express()
app.use(express.json())


//Salvar dados do usuário
app.post('/usuarios', async (req,res) => {

    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            city: req.body.city,
            state: req.body.state,
            date: req.body.date
        }
    })
    res.status(201).json(req.body)
})

//Listagem de usuários
app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

//Editando/atualizando usuários
app.put('/usuarios/:id', async (req,res) => {
    
    await prisma.user.update({

        where: {
            id: req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            city: req.body.city,
            state: req.body.state,
            date: req.body.date
        }
    })
    res.status(201).json(req.body)
})


app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Usuário deletado!"})
})












//rota para testes
app.listen(7000)
