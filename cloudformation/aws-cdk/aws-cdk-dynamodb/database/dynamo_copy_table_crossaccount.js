var copy = require('copy-dynamodb-table').copy

copy({
      config: {
          region: 'eu-central-1'
      },
      source: {
        tableName: 'Routing-Rules',
        config: {
          region: 'eu-central-1'
        }
      },
      destination: {
        tableName: 'Routing-Rules',
        config: {
          accessKeyId: 'AKID',
          secretAccessKey: 'SECRET',
          region: 'eu-central-1'
      }
    },
    log: true, // default false
    create : true // create destination table if not exist
  },
  function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log(result)
  })
