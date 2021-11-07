var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password,
	database : 'gamio'
});

function update(request, response){
    var username = request.session.username; 
    var newUsername = request.body.username; 

    console.log(username + newUsername);
    console.log(connection);
  //  console.log("in update");
    connection.query('UPDATE accounts SET username = (?) WHERE username = (?)', [newUsername, username], function (error) {
        console.log("in update connection.query 2");
        if(error){
            console.log("error updating" + error);
            response.send(error);  
        }else{
            request.session.username = newUsername;
            console.log("am updated" + request.session.username);
        }
    }
    )
}


module.exports = {update}; 