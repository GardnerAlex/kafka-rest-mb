module.exports = {
  apps : [
    {
      name: 'wwwServer',
      script: "./build/back/src_front/server_front/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
    },
    {
      name: 'dataSourceServer',
      script: "./build/back/src_back/data_source/apiServer.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
    },
    {
      name: 'dataFlowServer',
      script: "./build/back/src_back/data_flow/dataFlowAndSink.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
    },
    {
      name: 'dataProofServer',
      script: "./build/back/src_back/data_proof/dataProof.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
    },
  ]
};
