import hudson.model.*
import hudson.node_monitors.*
import hudson.slaves.*
import java.util.concurrent.*
jenkins = Hudson.instance

now=Calendar.instance;
def project_name = 'ARCHIE_DSL_TEST'

println("The build is run at ${now.time}");

freeStyleJob(project_name) {
        disabled(false)
        logRotator(-1, 10)
        description("Our first DSL Generated ServerSpec Job")
        parameters {
                choiceParam("SERVER_FQDN", ["server1.test.com.au", "server2.test.com.au", "server3.test.com.au", "server4.test.com.au"])
                description 'Select a server from the list to test'
        }
        scm {
                git {
                        remote {
                                github("MY_ORG/my_repo", 'ssh', 'github.aus.mydomain.com')
                                branch("*/master")
                        }
                }
        }
        triggers {
                scm("H/15 * * * *")
        }
        steps {
        }
}
