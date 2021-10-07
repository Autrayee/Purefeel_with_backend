var db = require('./connection')

function indexModel(){

    this.usersignup = (collection_name, userDetails) => {
        return new Promise((resolve, reject) => {
            db.collection(collection_name).find().toArray((err, result) => {
                if (err)
                    reject(err);
                else {
                    var _id
                    if (result.length == 0)
                        _id = 0
                    else {
                        var max_id = result[0]._id
                        for (let row of result) {
                            if (max_id < row._id)
                                max_id = row._id
                        }
                        _id = max_id
                    }

                    userDetails._id = _id + 1
                    userDetails.status = 1
                    userDetails.role = 'user'
                    userDetails.info = Date()
                    // console.log(userDetails)


                    db.collection(collection_name).insertOne(userDetails, (err, result) => {
                        err ? reject(err) : resolve(result);
                    })

                }
            })

        });
    }

    this.userlogin=(collection_name,userDetails)=>{
        return new Promise((resolve,reject)=>{
            db.collection(collection_name).find({"Email":userDetails.Email,"Password":userDetails.Password,"status":1}).toArray((err,result)=>{
                err  ? reject(err) : resolve(result);        
            })
        })
    }

}

module.exports = new indexModel()