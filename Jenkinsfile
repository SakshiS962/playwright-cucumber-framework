pipeline {
    agent any
    
    tools {
      nodejs 'Node JS'
    }

    parameters {
        choice(name: 'BROWSER', choices: ['chromium', 'firefox'], description: 'Browser')
        string(name: 'TAGS', defaultValue: '@checkout', description: 'Cucumber Tags')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npx playwright install chromium firefox'
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