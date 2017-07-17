const Models = require('./models');

const models = Models(process.env.MONGO_URL || 'mongodb://localhost/greetedUsers')

async function greet(){

    // purple
    // async/await

    console.log("===========================================");
    try{
      let users = await models.User.find({});
      // use users
      console.log("go!" + users);
    }
    catch(err){
      console.log(err);
    }
    //console.log(users);
    console.log("############################################");

    // indigo
    // callbacks
    models.User.find(function(err, users){
      console.log("------------------------");
      //console.log(users);
    });

    //no users here
    console.log("go go! "  + users);


    // a promise will return the result of a promise if it returns a promise
    return models.User.find({}, function(err, results){
      console.log(err);
      console.log(results);
    });

      // .then(function(users){
      //   //console.log(users);
      //   console.log(")))))))))))))))))))))))))))))))))");
      // })
      // .catch(function(err){
      //   //console.log(err);
      //   console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}");
      // });
      //
      // console.log("**************************************");
      // return "yeah!"
}

greet()
  .then(function(result){
    console.log(result);
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5");
});
