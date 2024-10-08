pipeline {
    agent any
    environment {
        USERNAME = 'criss'
    }
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage('Build and test') {
            agent {
                docker {
                    image 'node:20.11.1-alpine3.19' 
                    reuseNode true
                }
            }
            stages {
               stage('Instalar dependencias') {
                   steps {
                       sh 'npm install'
                   }
               } 
                stage('ejecucion de test') {
                   steps {
                       sh 'npm run test'
                   }
               } 
                stage('ejecucion de build') {
                   steps {
                       sh 'npm run build'
                   }
               } 
            }
        }
        stage('Code Quality') {
            stages {
                stage('SonarQube analysis') {
                    agent {
                        docker {
                            image 'sonarsource/sonar-scanner-cli' 
                            args '--network="devops-infra_default"'
                            reuseNode true
                        }
                    }
                    steps {
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner'
                        }
                    }
                }
                stage('Quality Gates'){
                    steps{
                        timeout(time: 10, unit: 'SECONDS') {
                            waitForQualityGate abortPipeline: true
                        }
                    }
                }
            }
        }
        stage('delivery'){
            steps {
                script {
                    docker.withRegistry('http://localhost:8082', 'nexus-key') {
                        sh 'docker build -t lab5:latest .'
                        sh "docker tag lab5:latest localhost:8082/lab5:latest"
                        sh "docker tag lab5:latest localhost:8082/lab5:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                        sh 'docker push localhost:8082/lab5:latest'
                        sh "docker push localhost:8082/lab5:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                    }
                }
            }
        }
        stage('deploy'){
            steps {
                script {
                    docker.withRegistry('http://localhost:8082', 'nexus-key') {
                        sh "docker compose pull"
                        sh "docker compose up --force-recreate --build -d"
                    }
                }
            }
        }
    }
}