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
        
        stage('Debug - Verificar estructura') {
            steps {
                echo 'Contenido del directorio raíz:'
                bat 'dir'
                echo 'Buscando archivos package.json:'
                bat 'dir /s package.json'
                echo 'Contenido de carpetas principales:'
                bat 'if exist client dir client'
                bat 'if exist frontend dir frontend'
                bat 'if exist Mern dir Mern'
            }
        }
        
        stage('Instalar dependencias backend') {
            steps {
                dir('Mern/Mern') {
                    bat 'npm install'
                }
            }
        }
        
        stage('Instalar dependencias frontend') {
            steps {
                script {
                    // Buscar el directorio correcto del frontend
                    if (fileExists('client/package.json')) {
                        dir('client') {
                            bat 'npm install'
                        }
                    } else if (fileExists('frontend/package.json')) {
                        dir('frontend') {
                            bat 'npm install'
                        }
                    } else if (fileExists('Mern/client/package.json')) {
                        dir('Mern/client') {
                            bat 'npm install'
                        }
                    } else {
                        echo 'No se encontró package.json del frontend'
                        bat 'dir /s package.json'
                    }
                }
            }
        }
        
        stage('Ejecutar tests') {
            steps {
                dir('Mern/Mern') {
                    bat 'npm test'
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
