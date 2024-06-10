const express = require("express");
const router = express.Router();
const pool = require('../Pool');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { link } = require("fs");
const fs = require('fs')
const gm = require('gm').subClass({ imageMagick: true });
const multer = require('multer')
const upload = multer({ dest: 'images/' })
const path = require('path');

dotenv.config();

router.post("/createlink", authenticateToken, async(req, res) => {
    const {normalLink, linkName, picture, header, isAdult, description, category, tags} = req.body;

    const userName = await getUserNameById(req.user.id)

    try{
        if(linkName === ''){
            const newLinkName = generateLinkName()
            const prevData = await pool.query("SELECT * FROM links WHERE newname = $1", [newLinkName])
            const currentTime = new Date()
            if(prevData.rowCount === 0 && newLinkName.length > 0){
                const data = await pool.query('INSERT INTO  links(userid, oldname, newname, description, header, picture, views, is_visible, category, time_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id', [req.user.id, normalLink, newLinkName, description, header, picture, 0, true, category, new Date()])
                const id = data.rows[0].id
                for(let i = 0; i < tags.length; i++){
                    const searchTag = await pool.query("SELECT id FROM tags WHERE name = $1", [tags[i]])
                    if(searchTag.rowCount === 0){
                        const insert = await pool.query("INSERT INTO tags(name) VALUES($1) RETURNING id", [tags[i]])
                        const newId = insert.rows[0].id
                        const insertNew = await pool.query("INSERT INTO tags_selected(tagid, linkid, userid) VALUES($1, $2, $3)", [newId, data.rows[0].id, req.user.id])
                    }else{
                        const idOfTag = searchTag.rows[0].id
                        const insert = await pool.query("INSERT INTO tags_selected(tagid, linkid, userid) VALUES($1, $2, $3)", [idOfTag, data.rows[0].id, req.user.id])
                    }

                }

                res.json(data.rows[0].id)
            }
            else{
                res.json("name is already used")
            }


        }
        else{
            const spaced = linkName.split(" ").join("_")
            const newLinkName = `${userName}/${spaced}`
            const prevData = await pool.query("SELECT * FROM links WHERE newname = $1", [newLinkName])
            if(prevData.rowCount === 0 && newLinkName.length > 0 ){
                const data = await pool.query('INSERT INTO  links(userid, oldname, newname, description, header, picture, views, is_visible) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id', [id, normalLink, newLinkName, description, header, isAdult, picture, 0, true] )
                res.json('true')

            }
            else{
                res.json('name is taken')
            }

        }

    }
    catch(error){
        console.log("ERROR", error)
        res.json(false);
    }

})

router.put('/getMyData',authenticateToken, async(req, res) => {
    if(req.user !== undefined){
        const data = await pool.query("SELECT SUM(views) FROM links WHERE userid = $1", [req.user.id])
        res.json(data.rows[0])
    }
    else{
        res.json(undefined)
    }
})


router.get("/getMyInfo", authenticateToken, async(req, res) => {
    if(req.user !== undefined){
        const id = req.user.id
        const data = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        data.rows[0].loggedIn = req.user.id === null
        res.json(data.rows[0])
    }
    else{
        res.json({});
    }
});


router.put('/getLinkByName', async(req,res) => {
    console.log("HERE")
    const {id, count} = req.body;
    const data = await pool.query("SELECT * FROM links WHERE newname = $1", [id]);
    console.log("HERE", data)
    if(count){
        const increase = await pool.query("UPDATE links SET views = views+1 WHERE newname = $1", [id])
    }

    if(data.rows[0] === undefined || data.rows[0].is_visible === false){
        res.json('undefined')
    }
    else{
        res.json(data.rows[0])
    }
})

router.post('/deletelink', authenticateToken, async(req, res) => {
    const user = req.user;
    console.log("MY USER", user)
    if(user !== undefined){
        const userid = req.user.id

        const {id} = req.body;
        const linkInfo = await pool.query("SELECT * FROM links WHERE id = $1", [id])
        const myLinkInfo = linkInfo.rows[0]
        console.log('myLinkInfo', myLinkInfo)
        console.log('must be true', myLinkInfo.userid === userid)
        if(myLinkInfo.userid === userid){
            try{
                console.log('trying to delete')
                await pool.query("DELETE FROM tags_selected WHERE userid = $1", [userid])
                await pool.query("DELETE FROM links WHERE id = $1", [id]);
                res.status(200).json('true')
            }
            catch{
                console.log("error while deleting")
                res.status(500).json('something went wrong')
            }
        }
    }
    else{
        res.status(403).json("Something went wrong")
    }
})


router.put('/getNamedLinkByName', async(req,res) => {
    const {combinedName} = req.body;
    const data = await pool.query("SELECT * FROM links WHERE newname = $1", [combinedName]);
    const increase = await pool.query("UPDATE links SET views = views+1 WHERE newname = $1", [combinedName])
    if(data.rows[0] === undefined){
        res.json('undefined')
    }
    else{
        res.json(data.rows[0])
    }

})



router.put("/getlinks", async(req, res) => {
    const id = await getIdByUserName(req.body.name)
    if(id === undefined){
        res.json(undefined)
    }
    else{
        const data = await pool.query("SELECT userid, oldname, newname, description, header, picture, is_visible, views, category, time_link FROM links WHERE userid = $1 ORDER BY ID DESC", [id])
        try {
            for(let i = 0; i < data.rowCount; i++){
                if(data.rows[i] === undefined){}
                else{
                    const userName = req.body.name;
                    data.rows[i].username = userName
                    const time = (data.rows[i].time_link);
                    data.rows[i].link_time = `${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()}`
                }
            }
            res.json(data.rows)
        } catch (error) {
            res.json([])
        }
    }
});

router.get("/getmylinks", authenticateToken, async(req, res) => {

    const data = await pool.query("SELECT * FROM links WHERE userid = $1", [req.user.id]);

    res.json(data.rows)

});

router.put('/isAdultAllowed', authenticateToken, async(req,res) => {
    if(req.user !== undefined){
        const id = req.user.id

        const data = await pool.query("SELECT  FROM users WHERE id = $1", [id]);
        if(id !== undefined){
            res.json(data.rows[0].data);
        }
        else{
            res.json('notSigned');
        }
    }
    else{
        res.json(false)
    }

})




router.get('/getUser', authenticateToken, async(req,res) => {
    if(req.user === undefined){
        const user = undefined
        res.json(user);
    }
    else{
        const {id} = req.user;
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(user.rows[0]);
    }


})



router.put('/getUserByName', authenticateToken, async(req,res) => {
    const data = await pool.query('SELECT * FROM users WHERE username = $1', [req.body.name])
    const theUser = data.rows[0]
    if(data.rows[0] === undefined){
        res.json({});
    }
    else{
        const totalLinks = await pool.query("SELECT COUNT(*) FROM links WHERE userid = $1", [data.rows[0].id])
        const number = totalLinks.rows[0].count
        if(req.user !== undefined){
            theUser.me = data.rows[0].id === req.user.id;
            theUser.totalLinks = number;
        }
        else{
            theUser.me = false;
            theUser.totalLinks = number;
        }
        res.json(theUser);
    }
})

router.put('/getLinkInfo', authenticateToken, async(req, res) => {
    if(req.body.id){
        const data = await pool.query("SELECT * FROM links WHERE id = $1", [req.body.id])
        res.json(data.rows[0])
    }else{res.json('invalid id')}
})

router.post('/updatelink', authenticateToken, async(req, res) => {
    try {
        const {newOldName, newPicURL} = req.body;
        if(newOldName !== "" && newPicURL !== ""){ //user wants to update both PICURL and header
            const data = await pool.query("UPDATE links set oldname = $1 AND picture = $2 WHERE id = $3", [newOldName, newPicURL, req.body.id])
        }
        else if(newOldName !== "" && newPicURL === ""){ //user wants to update only header
            const data = await pool.query("UPDATE links set oldname = $1 WHERE id = $2", [newOldName, req.body.id])
        }
        else if(newOldName === "" && newPicURL !== ""){ //user wants to update only PIURL
            const data = await pool.query("UPDATE links set picture = $1  WHERE id = $2", [newPicURL, req.body.id])
        }
    } catch (error) {

    }
    res.json('ok')
})



router.put('/hideMyLink', authenticateToken, async(req, res) => {
    const {id, reverseVisibility} = req.body
    const data = await pool.query("UPDATE links SET is_visible = $1 WHERE id = $2", [reverseVisibility,id])
    res.json("true")
})
////////////////////////// not efficient
router.put('/getinitlinks', async(req, res) => {
    const limit = req.body.limit;
    const data = await pool.query("SELECT userid, oldname, newname, description, header, picture, is_visible, views, category, time_link FROM links WHERE is_visible = true ORDER BY ID DESC LIMIT $1", [limit])
    console.log("found", data)
    try {
        for(let i = limit -20; i < limit; i++){
            if(data.rows[i] === undefined){}
            else{
                const userData = await pool.query("SELECT userName FROM users WHERE id = $1", [data.rows[i].userid]);
                const userName = userData.rows[0].username;
                data.rows[i].username = userName
                const time = (data.rows[i].time_link);
                data.rows[i].link_time = `${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()}`
            }
        }
        console.log("back-end sent",data.rows.slice(limit-20))
        res.json(data.rows.slice(limit-20))
    } catch (error) {
        res.json([])
    }
})



router.put('/searchForLink', async(req, res) => {
    const search = req.body.word;
    const data = await pool.query("SELECT * FROM links WHERE position($1 in LOWER(header))>0", [search])
    console.log("ALL FIRST POOL FOUND", data.rows)
    const data2 = await pool.query("SELECT id FROM tags WHERE name = $1", [search])
    const myLinks = [];
    for(let i = 0; i<data.rowCount; i++){
        const userData = await pool.query("SELECT userName FROM users WHERE id = $1", [data.rows[i].userid]);
        const userName = userData.rows[0].username;
        data.rows[i].username = userName
        const time = (data.rows[i].time_link);
        data.rows[i].link_time = `${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()}`
        myLinks.push(data.rows[i])
    }
    if(data2.rowCount === 0){

    }else{
        const idOfTag = data2.rows[0].id;
        const links = await pool.query("SELECT linkid FROM tags_selected WHERE tagid = $1", [idOfTag]);

        for(let i = 0; i<links.rowCount; i++){

            const getLink = await pool.query("SELECT * FROM links WHERE id = $1", [links.rows[i].linkid])
            const userData = await pool.query("SELECT userName FROM users WHERE id = $1", [getLink.rows[0].userid]);
            const userName = userData.rows[0].username;
            getLink.rows[0].username = userName
            const time = (getLink.rows[0].time_link);
            getLink.rows[0].link_time = `${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()}`
            if(myLinks.some((element) => element.id === getLink.rows[0].id)){

            }else{
                myLinks.push(getLink.rows[0])
            }
        }
    }
    console.log('data.rows', data.rows)
    console.log('myLinks', myLinks)
    res.json(myLinks)
})

router.post('/senderror', async(req, res) => {
    try{
        const data = await pool.query("INSERT INTO errors(email, header, body) VALUES ($1, $2, $3)", [req.body.email, req.body.header, req.body.body])
        res.json('ok')
    }catch(err){
        res.status(500).json('error occured')
    }
})

router.put('/updateUserName', authenticateToken, async(req, res) => {
    try {
        const newUserName = req.body.newUserName;
        const userIndex = req.user.id
        const num = await pool.query("SELECT number_name_update FROM users WHERE id = $1", [userIndex]);
        if(num.rows[0].number_name_update === 2){
            res.json("max")
        }else{
            const data = await pool.query("UPDATE users SET username = $1, number_name_update = $2 WHERE id = $3", [newUserName, num.rows[0].number_name_update+1, userIndex])
            res.json("ok")
        }

    } catch (error) {
        console.log(error)
        res.status(500).json("ERR OCCURED")

    }


})


router.post('/deleteAccount', authenticateToken, async(req, res) => {
    try {
        const newUserName = req.body.newUserName;
        const userIndex = req.user.id
        const delete1 = await pool.query("DELETE FROM tags_selected WHERE userid = $1", [userIndex])
        const delete2 = await pool.query("DELETE FROM links WHERE userid = $1", [userIndex]);
        const delete3 = await pool.query("DELETE FROM users WHERE id = $1", [userIndex])
        res.status(200).json('ok')
    } catch (error) {
        console.log(error)
        res.status(500).json("ERR OCCURED")

    }


})



router.post('/updateTags', authenticateToken, async(req, res) => {
    try {
        const tags = req.body.tags;
        const userIndex = req.user.id
        console.log(tags)
        const linkid = req.body.id;
        await pool.query("DELETE FROM tags_selected WHERE linkid = $1", [linkid])
        for(let i = 0; i < tags.length; i++){
            const searchTag = await pool.query("SELECT id FROM tags WHERE name = $1", [tags[i]])
            if(searchTag.rowCount === 0){
                const insert = await pool.query("INSERT INTO tags(name) VALUES($1) RETURNING id", [tags[i]])
                const newId = insert.rows[0].id
                const insertNew = await pool.query("INSERT INTO tags_selected(tagid, linkid, userid) VALUES($1, $2, $3)", [newId, linkid, userIndex])
            }else{
                const idOfTag = searchTag.rows[0].id
                const insert = await pool.query("INSERT INTO tags_selected(tagid, linkid, userid) VALUES($1, $2, $3)", [idOfTag, linkid, userIndex])
            }

        }

        res.json("ok");
    } catch (error) {
        console.log(error);
        res.status(500).json("ERR OCCURED");
    }
})


router.put("/getRefCount", authenticateToken, async(req, res) => {
    try {
        const userIndex = req.user.id
        const data = await pool.query("SELECT COUNT(*) FROM users WHERE ref = $1", [userIndex]);
        console.log('data', data)
        res.json(data.rows[0].count)
    } catch (error) {
        console.log("ERROR ", error)
        res.json('error occured')
    }
})


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


async function getUserNameById (id){
    const data = await pool.query("SELECT username FROM users  WHERE id = $1", [id])
    return data.rows[0].username
}

///edited

async function getIdByUserName (name){
    const data = await pool.query("SELECT id FROM users  WHERE username = $1", [name])

    if(data.rowCount === 0){
        return undefined
    }
    else{
        return data.rows[0].id
    }

}


function generateLinkName() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;

    for ( var i = 0; i < 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const imageStorage = multer.diskStorage({
    destination: 'images', // Destination to store image
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
        // file.fieldname is name of the field (image), path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000   // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|)$/)) {     // upload only png and jpg format
            return cb(new Error('Please upload a Image'));
        }
        cb(undefined, true)
    }
})


router.post('/updatepicture',authenticateToken, imageUpload.single('image'), async(req,res) => {
    const {filename} = req.file

    gm(`C:/Users/cimen/Desktop/linkne.com_test/server/images/${filename}`)
        .write(`C:/Users/cimen/Desktop/linkne.com_test/server/images/${filename}`, function (err) {
          if (!err) console.log('crazytown has arrived');
    })


    const data = await pool.query('UPDATE users SET picture = $1 WHERE id = $2', [filename, req.user.id])
    res.json('true')
});



router.post('/uploadLinkPicture', authenticateToken, imageUpload.single('image'), async(req,res) => {
    const {filename} = req.file
    const linkId = req.body.id

    if(linkId === undefined || linkId === 'undefined'){
        return res.status(401).json("Something went wrong")
    }else{
        const prevImage = await pool.query("SELECT picture FROM links WHERE id = $1", [linkId])
        if(prevImage.rowCount === 0){
            gm(`/home/mrrobot/app/images${filename}`)
            .quality(25)
            .write(`/home/mrrobot/app/images/${filename}`, function (err) {
              if (!err) console.log('crazytown has arrived');
            })
            const data = await pool.query('UPDATE links SET picture = $1 WHERE id = $2', [filename, linkId])
            res.json('true')
        } else{
            if(prevImage.rows[0].picture.includes('http')){
                const data = await pool.query('UPDATE links SET picture = $1 WHERE id = $2', [filename, linkId])
                res.json('true')
            }else{
                if(prevImage.rows[0].picture !== ''){
                    fs.unlink(`/home/mrrobot/app/images/{prevImage.rows[0].picture}`, (err) => {console.log('error while uploading'); console.log(err)})
                }
                else{

                }
                gm(`C:/Users/cimen/Desktop/linkne_server/images/${filename}`)
                .quality(25)
                .write(`C:/Users/cimen/Desktop/linkne_server/images/${filename}`, function (err) {
                  if (!err) console.log('crazytown has arrived');
                  console.log('err', err)
                })


                const data = await pool.query('UPDATE links SET picture = $1 WHERE id = $2', [filename, linkId])
                res.json('true')
            }
        }

    }
});


module.exports = router;