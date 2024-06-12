var duckdb = require('duckdb')
var db = new duckdb.Database(
  'test.db',
  {
    access_mode: 'READ_WRITE',
    max_memory: '512MB'
  },
  (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('DB created')
  }
) // or a file name for a persistent DB
db.all('SELECT 42 AS fortytwo', function (err, res) {
  if (err) {
    console.warn(err)
    return
  }
  console.log(res[0].fortytwo)
})
