import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
  /*setUsers para alterar os dados que aparecem na tela*/
  const [users, setUsers] = useState ([])

  /*usando useRef para guardar o valor dos inputs na variavel*/
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  const inputCity = useRef()
  const inputState = useRef()
  const inputDate = useRef()


  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
    
  }

  /*enviando as informações do usuário para o back-end*/
  async function createUsers(){
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
      city: inputCity.current.value,
      state: inputState.current.value,
      date: inputDate.current.value
    })
    getUsers()
  }

  /*função para deletar os usuários*/
  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name='Nome' type='text' ref={inputName}/>
        <input placeholder="Idade" name='Idade' type='number' ref={inputAge}/>
        <input placeholder="E-mail" name='Email' type='email' ref={inputEmail}/>
        <input placeholder="Cidade" name='Cidade' type='text' ref={inputCity}/>
        <input placeholder="Estado" name='Estado' type='text' ref={inputState}/>
        <input placeholder="Data" name='Data de Cadastro' type='text' ref={inputDate}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>


      {users.map(user => (

        <div key={user.id} className='card'>
          <div>
            <p>Nome: {user.name}</p>
            <p>Idade: {user.age}</p>
            <p>Email: {user.email}</p>
            <p>Cidade: {user.city}</p>
            <p>Estado: {user.state}</p>
            <p>Data de Cadastro: {user.date}</p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>

      ))}



    </div>

  )
}

export default Home
