pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                pwsh(script: 'docker ps -a')
            }
        }
    }
}
