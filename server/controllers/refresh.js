import expressAsyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'

const refresh = expressAsyncHandler((req, res) => {

    let token, userId, email;
    let authHeader = req.headers.Authorization || req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401)
                throw new Error("user is not authorized")
            }

            userId = decoded.userId
            email = decoded.email
        
        })
        if (!token) {
            res.status(401)
            throw new Error("User is not authorized or token is missing")
        }
    } else {
        res.status(403)
        throw new Error("Missing Auth Token")
    }

    const newAccessToken = jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '120m'
    });

    res.send({ token: newAccessToken });
})

export default refresh