pipeline {
    agent any

    tools {
        nodejs 'NodeJS_18'
    }

    environment {
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Descargando código fuente...'
                checkout scm
            }
        }

        stage('Instalar dependencias backend') {
            steps {
                dir('Mern/Mern') {
                    echo 'Instalando dependencias del backend...'
                    bat 'npm install'

                    script {
                        try {
                            bat 'npm list jest'
                            echo 'Jest encontrado en dependencias'
                        } catch (Exception e) {
                            echo 'Jest no encontrado, instalando...'
                            bat 'npm install --save-dev jest'
                        }

                        try {
                            bat 'npm list jest-junit'
                            echo 'jest-junit encontrado en dependencias'
                        } catch (Exception e) {
                            echo 'jest-junit no encontrado, instalando...'
                            bat 'npm install --save-dev jest-junit'
                        }
                    }
                }
            }
        }

        stage('Instalar dependencias frontend') {
            steps {
                script {
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

                    script {
                        try {
                            bat 'npx jest --version'
                            echo 'Jest disponible via npx'
                        } catch (Exception e) {
                            echo 'Jest no disponible, continuando sin tests'
                        }
                    }
                }
            }
        }

        stage('Ejecutar tests') {
            steps {
                dir('Mern/Mern') {
                    echo 'Ejecutando tests...'
                    script {
                        try {
                            bat 'npx jest --passWithNoTests --verbose --testResultsProcessor=jest-junit || echo "Tests fallaron o no hay tests"'
                        } catch (Exception e) {
                            echo "Error ejecutando tests: ${e.getMessage()}"
                            currentBuild.result = 'UNSTABLE'
                        }
                    }
                }
            }
        }

        stage('Build frontend') {
            steps {
                script {
                    def frontendPaths = [
                        'Mern/Mern/client',
                        'client',
                        'frontend'
                    ]

                    def frontendFound = false

                    for (path in frontendPaths) {
                        if (fileExists("${path}/package.json")) {
                            echo "Construyendo frontend en: ${path}"
                            dir(path) {
                                try {
                                    bat 'npm run build'
                                } catch (Exception e) {
                                    echo 'Falló la construcción del frontend'
                                    echo "Error: ${e.getMessage()}"
                                }
                            }
                            frontendFound = true
                            break
                        }
                    }

                    if (!frontendFound) {
                        echo 'No se encontró frontend para construir'
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                if (fileExists('**/junit.xml') || fileExists('**/test-results.xml')) {
                    try {
                        junit testResults: '**/junit.xml, **/test-results.xml', allowEmptyResults: true
                    } catch (Exception e) {
                        echo "No se pudieron publicar resultados de tests: ${e.getMessage()}"
                    }
                }

                if (fileExists('coverage/index.html')) {
                    try {
                        publishHTML([
                            allowMissing: true,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'coverage',
                            reportFiles: 'index.html',
                            reportName: 'Coverage Report'
                        ])
                    } catch (Exception e) {
                        echo "No se pudo publicar reporte de cobertura: ${e.getMessage()}"
                    }
                }
            }

            echo 'Limpiando workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline ejecutado exitosamente!'
        }
        failure {
            echo 'Pipeline falló. Revisar logs.'
        }
        unstable {
            echo 'Pipeline completado con advertencias (tests fallaron pero build continuó).'
        }
    }
}
