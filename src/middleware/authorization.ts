import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

interface JwtPayload {
    user:{id: number,
      password_digest: string,}
  }

dotenv.config();

const authorization = (req: Request, res: Response, next: NextFunction) => {

    try {

        const authorizationHeader = req.headers.authorization;    
        // eslint-disable-next-line prettier/prettier
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)as JwtPayload
    
       
    } catch(err) {
        res.status(401)
        res.json(err+"hhh")
        return
    }
    next()
};

export default authorization;
