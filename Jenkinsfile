pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git 'https://github.com/tu_usuario/tu_repositorio.git'
            }
        }

        stage('Instalar dependencias - Backend') {
            steps {
                dir('.') {
                    bat 'npm install'
                }
            }
        }

        stage('Instalar dependencias - Frontend') {
            steps {
                dir('client') {
                    bat 'npm install'
                }
            }
        }

        stage('Ejecutar pruebas - Backend') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build - Frontend') {
            steps {
                dir('client') {
                    bat 'npm run build'
                }
            }
        }

        stage('Despliegue con Docker Compose') {
            steps {
                bat 'docker-compose down || exit 0'
                bat 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado.'
        }
        success {
            echo 'Pipeline completado con éxito.'
        }
        failure {
            echo 'Error en alguna etapa del pipeline.'
        }
    }
}
