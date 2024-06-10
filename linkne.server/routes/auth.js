const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../Pool');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer")

dotenv.config();


router.post("/check", async(req, res) => {

    const response = authenticateCookie(req.headers['x-auth-token'])
    if(response === true){
        const token = req.headers['x-auth-token'];
        let id = undefined;
        jwt.verify(token, process.env.TOKEN_REFRESH, (err, user) => {
            if(err) id === undefined
            else{
                id = user.id;
            }
        })
        if(id === undefined){
            res.sendStatus(403)
        }
        else{
            const data = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
            const user = data.rows[0]
            if(user === undefined){
                res.json(false)
            }
            else{

                const token = generateAccessToken(user.id);
                user.auth = true;
                user.accessToken = token
                res.json(user)
            }
        }
    }
    else{
        res.json(false)
    }

})

router.post("/signup", async(req, res) => {
    const {email, tel, username, password, ref} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password.value, salt)
    const data = await pool.query("SELECT * FROM users WHERE email = $1 OR username = $2", [email.value, username]);

    if(data.rowCount >= 1){
        res.status(400).json("Username or email already in use");
    }
    else{
        try{
            const randomNumber = Math.floor(1000 + Math.random() * 9000) //4 digit randomNumber
            const data = await pool.query("SELECT * FROM users WHERE verificationCode = $1", [randomNumber]);
            if(data.rowCount ===0){

            }else{
                randomNumber =  Math.floor(1000 + Math.random() * 9000)
            }

            // let transporter = nodemailer.createTransport({
            //     host: "mail.linkne.io",
            //     port: 465,
            //     secure: true,
            //     auth:{
            //         user: process.env.EMAIL_NAME,
            //         pass: process.env.EMAIL_PASS
            //     }
            // });

            // let message = await transporter.sendMail({
            //     from : 'verification@linkne.io',
            //     to: email.value,
            //     subject: "Linkne.io Verification Code",
            //     text: `Your verification code is: ${randomNumber}`
            // })
            let refId = 0;

            if(!(ref === undefined) && !(ref === 'undefined')){
                const refUserId = await pool.query("SELECT id FROM users WHERE username = $1", [ref]);
                if(refUserId === undefined){
                    if(refUserId.rows !== undefined && !isNaN(refUserId.rows[0].id)){
                        refId = refUserId.rows[0].id
                    }else{}
                }
            }
            console.log("REF ID FINAL", refId)
            const addUser = await pool.query("INSERT INTO users(email, password, username, picture, total_link_number, verificationCode, number_name_update, is_verified,time_verification, time_name_update, ref) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)", [email.value, hashedPassword, username, 'image_1674083899202.jpg', 0, false, randomNumber, 0, false, new Date(), new Date(), refId]);
            res.json("auth");
        }
        catch(err){
            console.log('err', err)
            res.status(500).json('An error accured, please try again later or contact us')
        }
    }
})

router.post("/signin", async(req, res) => {
    const {email, password} = req.body;
    const data = await pool.query("SELECT * FROM users WHERE email = $1", [email.value]);
    const user = data.rows[0];
    if(user === undefined){
        res.status(404).json("user not found")
        return;
    }
    if(user.is_verified === false){
        res.status(403).json("unverified")
        return;
    }

    const validate = await bcrypt.compare(req.body.password.value, user.password);


    if(validate === false){

        res.status(500).json("Error occured, please try again later")
    }
    else{
        const token = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 15 * 24 * 60  * 60 * 1000
        })
        res.status(200).header('auth-token', token).json({accessToken: token, refreshToken: refreshToken});
    }

})


router.post("/checkauthinfo", async(req,res) => {
    const {email, password} = req.body;

    const data = await pool.query("SELECT * FROM users WHERE email = $1", [email.value]);
    const user = data.rows[0];
    if(user === undefined){
        res.status(404).json("user not found")
        return;
    }
    try {


        const validate = await bcrypt.compare(req.body.password.value, user.password);


        if(validate === false){

            res.status(500).json("Password is wrong")
        }else{
            res.status(200).json('ok')
        }


    } catch (error) {
        console.log('ERORR IN HERE')
        console.log(error)
        err = true;
    }



})

router.post("/verify", async(req,res) => {
    const {email, verificationCode} = req.body;
    const verificationCodeInteger = Number(verificationCode)
    console.log("EMAIL", verificationCodeInteger)
    const data = await pool.query("SELECT * FROM users WHERE email = $1", [email.value]);

    const user = data.rows[0];
    if(user === undefined){
        res.status(404).json("user not found")
        return;
    }
    console.log(user.verificationcode)
    if(Number(user.verificationcode) === verificationCodeInteger){
        const update = await pool.query("UPDATE users SET is_verified = $1, verificationCode = $2 WHERE id= $3", [true, 0,user.id])
        const token = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 15 * 24 * 60  * 60 * 1000
        })
        console.log(token)
        res.status(200).header('auth-token', token).json({accessToken: token, refreshToken: refreshToken});

    }else{
        res.status(403).json("Verification code is not right")
    }

})

router.post('/changepassword', authenticateToken, async(req, res) => {
    const {oldPassword, newPassword} = req.body;
    const userIndex = req.user.id;

    const data = await pool.query("SELECT * FROM users WHERE id = $1", [userIndex]);
    const user = data.rows[0];

    try {

        const validate = await bcrypt.compare(oldPassword, user.password);
        if(validate){
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(newPassword, salt)
            const update = await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, userIndex])
            res.json("success")
        }else{
            res.json("pass is not right")
        }
    } catch (error) {
        console.log("ErROR", error)
        res.status(500).json("error")

    }

})

router.post("/recoververify", async(req,res) => {
    const {email, verificationCode} = req.body;
    const verificationCodeInteger = Number(verificationCode)
    const data = await pool.query("SELECT * FROM users WHERE email = $1", [email.value]);

    const user = data.rows[0];
    if(user === undefined){
        res.status(404).json("user not found")
        return;
    }
    console.log(user)
    console.log(Number(user.verificationcode))
    console.log(verificationCodeInteger)
    if(Number(user.verificationcode) === verificationCodeInteger){
        const update = await pool.query("UPDATE users SET is_verified = $1, verificationCode = $2 WHERE id= $3", [true, 0,user.id])
        const token = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 15 * 24 * 60  * 60 * 1000
        })
        res.status(200).header('auth-token', token).json({accessToken: token, refreshToken: refreshToken});
    }else{
        res.status(403).json("Verification code is not right")
    }

})


router.post("/updateforgottenpassword", async(req, res) => {
    const {newPassword, email} = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt)
        const update = await pool.query("UPDATE users SET password = $1 WHERE email = $2", [hashedPassword, email.value])
        const data = await pool.query("SELECT * FROM users WHERE email = $1", [email.value]);

        const user = data.rows[0];

        const token = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 15 * 24 * 60  * 60 * 1000
        })
        res.status(200).header('auth-token', token).json({accessToken: token, refreshToken: refreshToken});
    } catch (error) {
        res.status(500).json("err")
    }

})


router.post('/refresh', (req, res) => {
    // take the refresh token from the user
    //send error if there isno token or it is invalid
    //if not create another access token

    const refreshToken = req.cookies.jwt

    if(!refreshToken) return res.status(401).json("You are not authenticated!");

    jwt.verify(refreshToken, process.env.TOKEN_REFRESH, (err, user) => {
        err && console.log(err);

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        res.status(200).json({
            token: newAccessToken,
        })
    })

})



router.post("/getnewverification", async(req, res) => {
    const {email} = req.body;
    const lastTime = await pool.query("SELECT time_verification from users WHERE email = $1", [email.value]);
    const timeOfSent = lastTime.rows[0].time_verification;
    const sentTime = new Date(timeOfSent).getTime() + 180000;
    const currentTime = new Date().getTime()  // 180 000 miliseconds = 3 minutes

    try {
        if(sentTime > currentTime){ //3 minutes passed
            const newRandom = Math.floor(1000 + Math.random() * 9000)
            sendEmailWithVerification(email, newRandom, "verification")
            const update = await pool.query("UPDATE users SET verificationcode = $1, time_verification = $2 WHERE email = $3", [newRandom, new Date, email.value])
            res.json("ok")
        }else{
            res.json("You have to wait 3 minutes")
        }
    } catch (error) {
       console.log("ERROR", error)
       res.status(403).json("You have to wait 3 minutes")
    }


})

const sendEmailWithVerification = async(email, randomNumber, type) => {
    let transporter = nodemailer.createTransport({
        host: "mail.linkne.io",
        port: 465,
        secure: true,
        auth:{
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASS
        }
    });

    let message = await transporter.sendMail({
        from : 'verification@linkne.io',
        to: email.value,
        subject: `Linkne.io ${type} Code`,
        text: `Your ${type} code is: ${randomNumber}`
    })
}

router.post("/updatePassword", async(req, res) => {
    const id = await getUserByIndex(req)
    const {newPassword, oldPassword} = req.body;

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id])

    bcrypt.compare(oldPassword, user.rows[0].password).then(() => {
        const newestPassword = bcrypt.encrypt(newPassword)
        const upt = pool.query("UPDATE users SET passwrod = $1 WHERE id = $2", [newestPassword, id]);
    }).catch((err) => {
        res.status(403).json("PASS DOESNT MATCH")
    })

})

router.post("/deleteAccount", async(req, res) => {

    const id = await getUserByIndex(req);
    const deleteLinks = await pool.query("DELETE FROM links WHERE userid = $1", [id]);
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [id])

})

router.post("/recoverpassword", async(req, res) => {
    const {email} = req.body;

    const lastTime = await pool.query("SELECT time_verification from users WHERE email = $1", [email.value]);
    if(lastTime.rowCount === 0){

        res.json("no user");

    }else{

        const timeOfSent = lastTime.rows[0].time_verification;
        const sentTime = new Date(timeOfSent).getTime() + 180000;
        const currentTime = new Date().getTime()  // 180 000 miliseconds = 3 minutes

        try {
            if(sentTime < currentTime){ //3 minutes passed
                const newRandom = Math.floor(1000 + Math.random() * 9000)
                sendEmailWithVerification(email, newRandom, "recovery")
                const update = await pool.query("UPDATE users SET verificationcode = $1, time_verification = $2 WHERE email = $3", [newRandom, new Date, email.value])
                res.json("ok")
            }else{
                res.json("wait")
            }
        } catch (error) {
           console.log("ERROR", error)
           res.status(500).json("Error occured")
        }

    }





})




function generateAccessToken(id){
    return jwt.sign({id}, process.env.TOKEN, { expiresIn: '30s' })
}

function generateRefreshToken(id){
    return jwt.sign({id}, process.env.TOKEN_REFRESH, { expiresIn: '10d' })
}

function getId(token){

    if(token == undefined) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN, (err, user) => {
        console.log(err);

        if(err) return res.sendStatus(403);

        req.user = user;

        next();
    })
}


function authenticateCookie(token){
    if(token == undefined || token == null) return false;

    jwt.verify(token, process.env.TOKEN_REFRESH, (err, user) => {

        if(err) return false

        return true;

    })
    return true;
}




function authenticateToken(req, res, next){
    const token = req.cookies.jwt;
    if(token === undefined || token === null) req.user=undefined;

    jwt.verify(token, process.env.TOKEN_REFRESH, (err, user) => {
        if(err){
            if(err.expiredAt){
                const refreshToken = req.cookies.token;

                if(!refreshToken) return res.status(401).json("You are not authenticated!");

                jwt.verify(refreshToken, process.env.TOKEN_REFRESH, (err, user) => {
                    err && console.log(err);
                    // const newAccessToken = generateAccessToken(user);
                    // const newRefreshToken = generateRefreshToken(user);

                    req.user = user;

                    // res.status(200).json({
                    //     token: newAccessToken,
                    // })

                });
            }
            else{
                req.user=undefined
            }

        }
        else{
            req.user = user;
        }


    })

    next();
}
module.exports = router;