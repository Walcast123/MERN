pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS' // Asegúrate de que el nombre coincida con tu configuración de Jenkins
    }
    
    environment {
        // Variables de entorno si las necesitas
        NODE_ENV = 'test'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Tu código de checkout aquí
                echo 'Descargando código fuente...'
            }
        }
        
        stage('Instalar dependencias backend') {
            steps {
                dir('Mern/Mern') {
                    echo 'Instalando dependencias del backend...'
                    bat 'npm install'
                    
                    // Verificar que Jest esté instalado
                    bat 'npm list jest || echo "Jest no encontrado en dependencias"'
                }
            }
        }
        
        stage('Instalar dependencias frontend') {
            steps {
                script {
                    // Verificar múltiples ubicaciones posibles del frontend
                    def frontendPaths = [
                        'Mern/Mern/client',
                        'client',
                        'frontend'
                    ]
                    
                    def frontendFound = false
                    
                    for (path in frontendPaths) {
                        if (fileExists("${path}/package.json")) {
                            echo "Frontend encontrado en: ${path}"
                            dir(path) {
                                echo 'Instalando dependencias del frontend...'
                                bat 'npm install'
                            }
                            frontendFound = true
                            break
                        }
                    }
                    
                    if (!frontendFound) {
                        echo 'No se encontró frontend o no es necesario'
                    }
                }
            }
        }
        
        stage('Verificar instalación') {
            steps {
                dir('Mern/Mern') {
                    echo 'Verificando instalación de Node.js y npm...'
                    bat 'node --version'
                    bat 'npm --version'
                    bat 'dir node_modules\\.bin\\jest.cmd || echo "Jest no encontrado en node_modules"'
                }
            }
        }
        
        stage('Ejecutar tests') {
            steps {
                dir('Mern/Mern') {
                    echo 'Ejecutando tests...'
                    // Usar npx para asegurar que Jest se encuentre
                    bat 'npx jest --version || echo "Jest no disponible via npx"'
                    bat 'npx jest --passWithNoTests --verbose'
                }
            }
            post {
                always {
                    // Publicar resultados de tests si tienes configurado Jest para generar reportes
                    publishTestResults testResultsPattern: 'test-results.xml'
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ])
                }
            }
        }
        
        stage('Build') {
            steps {
                dir('Mern/Mern') {
                    echo 'Construyendo aplicación...'
                    bat 'npm run build || echo "No build script found"'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Limpiando workspace...'
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
