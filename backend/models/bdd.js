const mongoose = require('mongoose');

let options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://morningUser:Lacapsule@cluster0.prvpu.mongodb.net/morningNews?retryWrites=true&w=majority', options,        
    function(err) {
        if(err) {
            console.log(err);
           } else {
             console.log('*****Connection Success*****')
           }
    }
   );