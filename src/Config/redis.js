const redis = require("redis") 
class Redis {

    constructor(){
        this.redisdb = redis.createClient({
            host : (process.env.REDIS_HOST || '127.0.0.1'),
            port : (process.env.REDIST_POST || '6379'),
            password : (process.env.REDIS_PASSWORD || 'aldi1234' )
        })
    }

    redisChek(){
        return new Promise( (resolve, reject) => {
            this.redisdb.get("testkey", (err, res) => {
                if(err) {
                    reject(err)
                }
                if(res === "OK" || res === null) {
                    resolve ("Connection to redis successfully.")
                }
            })
        })
    }
}

module.exports = new Redis()