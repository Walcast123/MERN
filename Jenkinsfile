pipeline {
    agent any
    
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
                    bat 'npm install'  // Cambiar sh por bat
                }
            }
        }
        
        stage('Instalar dependencias frontend') {
            steps {
                dir('client') {  // Ajusta la ruta según tu estructura
                    bat 'npm install'  // Cambiar sh por bat
                }
            }
        }
        
        stage('Ejecutar tests') {
            steps {
                dir('Mern/Mern') {
                    bat 'npm test'  // Cambiar sh por bat
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline ejecutado exitosamente!'
        }
        failure {
            echo 'Pipeline falló. Revisar logs.'
        }
    }
}
