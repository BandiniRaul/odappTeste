import express from 'express'
import cors from 'cors'
import  { PrismaClient }  from './generated/prisma/index.js'

const prisma = new PrismaClient()

//criando a variável "app" e colocando a biblioteca express dentro dela
const app = express()
app.use(express.json())
app.use(cors())


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

    //filtro de pesquisa usando query params
    let users = []
    if(req.query){
        users = await prisma.user.findMany({
            where:{
                name: req.query.name,
                email: req.query.email,
                age: req.query.age,
                city: req.query.city,
                state: req.query.state,
                date: req.query.date
            }
        })
    } else {
        const users = await prisma.user.findMany()
    }

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

//Deletando usuários
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
