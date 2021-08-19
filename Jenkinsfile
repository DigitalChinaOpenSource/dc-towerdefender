/*
    语法文档：https://www.w3cschool.cn/jenkins/jenkins-qc8a28op.html
    语法生成器：http://jenkins.dev.wh.digitalchina.com/job/dc.devops/pipeline-syntax/
*/
podTemplate(inheritFrom: 'pod1',
    containers:[
        //基础容器 可自行 添加
        containerTemplate(name:'jnlp',image:'harbor.dev.wh.digitalchina.com/devops/jenkins-slave-node-dev:latest')
    ],
    volumes:[
        hostPathVolume(hostPath:'/var/run/docker.sock',mountPath:'/var/run/docker.sock')
    ]
){
    node(POD_LABEL){
        properties([gitLabConnection('newgitlab.digitalchina.com')])
        if(BRANCH_NAME == 'master'){            
            gitlabBuilds(builds: ['Checkout','Sonar Test','PushImage','Deploy']){
                stage 'Checkout'
                gitlabCommitStatus('Checkout'){
                    checkout scm
                }
                
                stage 'Sonar Test'
                gitlabCommitStatus('Sonar Test'){
                    def scannerHome = tool 'sonar.dev.wh.digitalchina.com'
                    withSonarQubeEnv(installationName:'sonar.dev.wh.digitalchina.com',credentialsId:'sonar_admin'){
                        sh scannerHome + '/bin/sonar-scanner -Dsonar.projectKey=towerdefense'
                    }  
                }
                
                stage 'Push Image'
                gitlabCommitStatus('PushImage'){
                    def IMAGE_NAME = 'harbor.dev.wh.digitalchina.com/towerdefense/towerdefense:build-$BUILD_NUMBER'
                    def IMAGE = docker.build(IMAGE_NAME,'.')
                    withDockerRegistry(credentialsId:'jiangkunf-591c221f-c6ec-41e3-879b-ed3d11a40e22',url:'https://harbor.dev.wh.digitalchina.com/'){ 
                        IMAGE.push()
                        sh 'docker rmi ' + IMAGE_NAME
                    }
                }  

                stage 'Deploy'
                //input(message:"部署到Rancher?", ok:"确定", submitter:"your itcode")
                gitlabCommitStatus('Deploy'){                
                    withCredentials([string(credentialsId: 'jiangkunf-ba6e4a42-3d9a-4daf-83dd-9495b0de1f8d', variable: 'token')]) {
                        sh 'rancher login https://rancher.wh.digitalchina.com/ --token $token --skip-verify --context c-wsxm5:p-56jkl'
                        //根据代码库中的deploy.yaml文件部署镜像
                        sh 'envsubst < Deploy.yaml | rancher kubectl apply -f -'
                    }
                }
            }
        }
        else{
            gitlabBuilds(builds: ['Checkout','Build','UnitTest']){
                stage 'Checkout'
                gitlabCommitStatus('Checkout'){
                    checkout scm
                    
                }
                
                stage 'Build'
                gitlabCommitStatus('Build'){
                    echo 'Build'
                }
                
                stage 'Unit Test'
                gitlabCommitStatus('UnitTest'){
                    echo 'UnitTest'
                }                
                
                stage 'Sonar Test'
                gitlabCommitStatus('SonarTest'){
                    echo 'SonarTest'
                }
            } 
        }
    }
}
