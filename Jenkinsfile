pipeline {
    agent any
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
                    if (env.BRANCH_NAME == 'main') {
                        ambiente = 'dev'
                    }
                    docker.withRegistry('http://localhost:8082', 'nexus-key') {
                        withCredentials([file(credentialsId: "${ambiente}-env", variable: 'ENV_FILE')]) {
                            writeFile file: '.env', text: readFile(ENV_FILE)
                            sh "docker compose pull"
                            sh "docker compose --env-file .env up -d --force-recreate"
                        }
                    }
                }
            }
        }
    }
}