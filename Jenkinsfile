pipeline {
    agent any

    stages {
        stage('Clonando o repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/eduardohsantos/testes-api-cy.git'
            }
        }
                stage('instalando as dependências') {
            steps {
                bat 'npm install'
            }
        }
               stage('instalanso as dependências') {
            steps {
                bat 'npx cypress@9.7.0 install'
            }
        }
                stage('Executar os testes') {
            steps {
                bat 'npx cypress@9.7.0 run set CYPRESS_VERIFY_TIMEOUT=100000'
            }
        }
    }
}