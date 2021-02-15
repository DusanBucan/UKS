

pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                def dockerHome = tool 'myDocker'
                env.PATH = "${dockerHome}/bin:${env.PATH}"
                sh 'docker ps -a'
            }
        }
    }
}
