import { db } from "../db.js";  
import jwt from "jsonwebtoken";
export const getPosts = (req,res)=>{
    const q = req.query.cat ? "SELECT * FROM post WHERE cat = ?" : "SELECT * FROM post";
    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const getPost = (req, res) => {
    const q = "SELECT p.idpost, `username`, `title`, `desc`, p.img, u.image AS userImg, `cat`, `date` FROM user u JOIN post p ON u.id = p.uid WHERE p.idpost = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json(err);
        }

        console.log("Retrieved data:", data); // Log the data to the console

        return res.status(200).json(data[0]);
    });
}


export const addPost = (req,res)=>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated");
    
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token not valid");

        const q ="INSERT INTO post (`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ];
        db.query(q, [values], (err, data) => {
            if (err) {
                console.log("Database error: ", err); // Log the error to the console
                return res.status(500).json(err); // Return error response
            }
            return res.status(200).json("Post has been created");
        });
        
        
    })
}

export const deletePost = (req,res)=>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json("Not authenticated");
    
    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token not valid");
        const postId = req.params.id;
        const q = "DELETE FROM post WHERE idpost = ? AND uid = ?";
        db.query(q,[postId,userInfo.id],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Post has been deleted");
        })
    })
}

export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token not valid");

        const postId = req.params.idpost;


        // Escape the `desc` keyword using backticks
        const q = `UPDATE post SET title=?, \`desc\`=?, img=?, cat=? WHERE idpost = ? AND uid = ?`;

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ];

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json("Post has been updated");
        });
    });
};
