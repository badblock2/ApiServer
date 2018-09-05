const environments = {
    development:{
        mysql:{
            username: 'root',
            password: 'dltndid1',
            database: 'stock_portfolio_dev'
        }
    },
    test:{
        mysql:{
            username: 'root',
            password: 'dltndid1',
            database: 'stock_portfolio_test'
        }
    },
    production:{
        mysql:{
            username: 'root',
            password: 'dltndid1',
            database: 'stock_portfolio'
        }
    }
}

const nodeEnv = process.env.NODE_ENV || 'development'
console.log('nodeEnv : (' + nodeEnv + ')');

module.exports = environments[nodeEnv];