const environments = {
    development:{
        mysql:{
            username: 'root',
            password: 'dltndid1',
            database: 'node_api_codelab_dev'
        }
    },
    test:{
        mysql:{
            username: 'root',
            password: 'dltndid1',
            database: 'node_api_codelab_test'
        }
    },
    production:{
        mysql:{
            username: 'root',
            password: 'dltndid1',
            database: 'node_api_codelab'
        }
    }
}

const nodeEnv = process.env.NODE_ENV || 'development'
console.log('nodeEnv : (' + nodeEnv + ')');

module.exports = environments[nodeEnv];