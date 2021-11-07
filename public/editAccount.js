var mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password,
	database : 'gamio'
});

function update(request, response){
    var username = request.session.username; 
    var email; 
    console.log("in update");
    connection.query('SELECT email FROM accounts WHERE username = (?)', [username], (error, results, fields) => {
        console.log("in update connection.query 1");
        if(error){
            console.log("error getting email " + error);
            response.send(error);
        }else{
            console.log(results);
            if(results.length > 0){
                console.log(results[0].email);
                email = results[0].email.toString(); 
                newUsername = request.body.username;
                update_SQL(newUsername, email, username);
                response.end();
            }
        }
    })
}

function update_SQL(newUsername, email, username){
    connection.query('UPDATE accounts SET username = (?) WHERE username = (?)' [newUsername, username], (error, results, fields) => {
        console.log("in update connection.query 2");
        if(error){
            console.log("error updating" + error);
            response.send(error);  
        }else{
            request.session.username = newUsername;
            console.log("am updated");
        }
    }
    )
}

module.exports = {update}; 