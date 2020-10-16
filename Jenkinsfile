def builderDocker
def CommitHash

pipeline {
    agent any

    parameters {
        booleanParam(name: 'RUNTEST', defaultValue: true, description: 'Toggle this value for testing')
        choice(name: 'Deploy', choices: ['production', 'deployement'], description: 'Deploy Other Server')
        choice(name: 'CICD', choices: ['CI', 'CICD'], description: 'Pick something')
        choice(name: 'Mode', choices: ['master','development', 'production'], description: 'Pili mode push')
    }

    stages {
        stage('Build Project') {
            steps {
                nodejs("node12") {
                    sh 'npm install'
                }
            }
        }

        stage('Testing Progress'){
            steps{
                echo "Testing in progress"
            }
        }

        stage("Verify Branch"){
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                script {
                    if (params.Mode == GIT_BRANCH) {                        
                        sh 'echo Verify Has Confirmed'
                    } else if (params.Mode != GIT_BRANCH) {
                        currentBuild.result = 'ABORTED'
                        error('Validation branch failed …')
                    }
                }
            }
        }
            
        stage("Pull Image Frontend"){
            when {
                expression {
                    params.CICD == 'CICD'
                }
            }
            
            steps {
                script{
                    if (params.Deploy == 'deployement') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Development',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'docker pull aldifarzum/dockerpos-frontend:latest;',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    } else if (params.Deploy == 'production') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Production',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'docker pull aldifarzum/dockerpos-frontend:latest;',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    }
                }
                echo 'Pull image frontend - successfully.'
            }
        }

        stage("Pull Image Backend"){
            when {
                expression {
                    params.CICD == 'CICD'
                }
            }
            
            steps {
                script{
                    if (params.Deploy == 'deployement') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Development',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'docker pull aldifarzum/dockerpos-backend:latest;',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    } else if (params.Deploy == 'production') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Production',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'docker pull aldifarzum/dockerpos-backend:latest;',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    }
                }
                echo 'Pull image backend - success.'
            }
        }
        
        

        stage('Running Compose') {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                script{
                    if (params.Deploy == 'deployement') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Development',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'cd pos-backend-frontend-cicd-jenkins-docker && docker-compose up -d --force-recreate; docker ps',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    } else if (params.Deploy == 'production') {
                        sshPublisher(
                            publishers: [
                                sshPublisherDesc(
                                    configName: 'Production',
                                    verbose: false,
                                    transfers: [
                                        sshTransfer(
                                            execCommand: 'cd pos-backend-frontend-cicd-jenkins-docker && docker-compose up -d --force-recreate; docker ps',
                                            execTimeout: 250000,
                                        )
                                    ]
                                )
                            ]
                        )
                    } else {
                        currentBuild.result = 'ABORTED'
                        error('Server doesnt exist')
                    }
                }
                echo 'Running compose finish check your server.'
            }
        }



        
    }
}