pipeline {
    environment {
        registry = "rderoci/meuproduto-frontend"
        registryCredential = 'dockerhub_id'
        dockerImage = ''
    }
    agent any

    stages {
        stage('Build Docker Image stage') {
            steps {
                script {
                    dockerImage = docker.build registry + ":latest"
                }
            }
        }

        stage('Push Docker Image stage') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Run Docker Image stage') {
            steps {
                sh '''
                    cp ./run_docker_image.sh /home/ubuntu/meuproduto/frontend/run_docker_image.sh
                    bash /home/ubuntu/meuproduto/frontend/run_docker_image.sh
                '''
            }
        }
    }
}