/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.body.usuarios[0].nome).to.equal('Fulano da Silva')
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(15)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": "Fulano da Silva",
                    "email": "beltrano@qa.com.br",
                    "password": "teste",
                    "administrador": "true"
               },
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });

     it('Deve validar um usuário com email inválido', () => {
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": "Fulano da Silva",
                    "email": "123@ig.com",
                    "password": "teste",
                    "administrador": "true"
               },failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {
              let id = response.body.usuarios[0]._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body:
                    {
                         "nome": "Fulano dos Santos",
                         "email": "bzqca@qa.com.br",
                         "password": "teste",
                         "administrador": "true"
                    }
               }).then((response) => {
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                    expect(response.status).to.equal(200)
               }) 
          })   
     });

     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[0]._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`
               }).then(response => {
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                    expect(response.status).to.equal(200)
               })
          })
     })
});
