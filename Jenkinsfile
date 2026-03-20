pipeline {
    agent any
    
    tools {
      nodejs 'nodejs'
    }

    parameters {
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Browser')
        string(name: 'TAGS', defaultValue: '@smoke', description: 'Cucumber Tags')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                sh "BROWSER=${params.BROWSER} npx cucumber-js --tags \"${params.TAGS}\""
            }
        }

        stage('Generate Report') {
            steps {
                sh 'npx allure generate allure-results --clean -o allure-report'
            }
        }
    }

    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
        }
    }
}