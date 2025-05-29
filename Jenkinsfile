pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    tools {
        nodejs 'NodeJS_18'  
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Walcast123/MERN'
            }
        }

        stage('Instalar dependencias backend') {
            steps {
                dir('Mern/Mern') {
                    sh 'npm install'
                }
            }
        }

        stage('Instalar dependencias frontend') {
            steps {
                dir('Mern/Mern/client') {
                    sh 'npm install'
                }
            }
        }

        stage('Ejecutar tests') {
            steps {
                dir('Mern/Mern') {
                    sh 'npm test'
                }
            }
        }
    }
}
