const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../db/dbconn');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const query = `SELECT * FROM user WHERE Login = '${email}'`;
    db.query(query, (err, result) => {
        if(err) {
            console.log(err);
        }
        else if(result.length < 1) {
            console.log(`Error: user not found..`);
            res.status(404).json({
                Error: {
                    info: 'user not found..'
                }
            });
        }
        else {
            //console.log(result);
            console.log(req.body.password,result[0].Password)
            let isEqual = bcrypt.compareSync(req.body.password, result[0].Password);
                if(isEqual) {
                    const token = jwt.sign({
                        id: result[0].id,
                        email: result[0].Login,
                        password: result[0].password
                    },
                    process.env.JWT_KEY, {
                        expiresIn: '1h'
                    });
                    console.log(`success: you just logged in to user...`);
                    res.status(200).json({
                        success: {
                            info: 'login successful..',
                            token: token
                        }
                    });
                }
                else {
                    console.log(`Error: email or password not vailid..`);
                    res.status(404).json({
                        Error: {
                            info: 'invailid email or password..'
                        }
                    });
                }
            
           
        }
        
    });
};