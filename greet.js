let models = null;

let addGreeting = function(req, res, next){

    let User = models.User;

    var actualName = req.body.name;
    var results = ""
     User.findOne({name:actualName}, function(err , person){
       if (err) {
         console.log(err)
         return next(err);
       }

       if(!person){
         console.log("no person found")

           let newPerson = new User({name:actualName,count:1});
           newPerson.save(function(error, data){
             if(error){
                 results = error
                 console.log(error);
             }
             else{
               console.log("successfully added new user");
               results = data
               res.redirect('/greetings');
                 //return data;
             }

           });

         }
         else{
             person.count = person.count + 1;

             var updateDone = function(error, status){
               if( error){
                  console.log(error);
                  return next(err)
               }

               console.log('lets show it!');
               res.redirect('greetings');
             };
             
             person.save(updateDone);

             console.log("Here we go!");

         }
         // console.log(results);
         // return results;
     })
}

let showGreeting = function(req, res){
    res.render('greeting');
}

module.exports = function(theModels){
  //set the models for the routes
  models = theModels;

  return {
    addGreeting,
    showGreeting
  }
}
