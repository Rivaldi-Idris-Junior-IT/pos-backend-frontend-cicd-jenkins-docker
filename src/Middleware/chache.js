const respone = require("../Helper/respon")
const redis = require("../Config/redis")

const getAll = (req, res, next) => {
   redis.redisdb.get("getAll", (err, ress) => {
       if(err){
          return respone(res, 500, err)
       }
       if (ress !== null){
           const data = JSON.parse(ress)
           return respone(res, 200, data)
       }else{ 
           next()
       }
   }) 
}

module.exports = getAll