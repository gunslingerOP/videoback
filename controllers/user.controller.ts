import axios from "axios";
import { google } from "googleapis";
import { async } from "validate.js";
import config from "../config";
import { User } from "../src/entity/User";
import { errRes, okRes } from "../tools/helpers";
import * as jwt from "jsonwebtoken";

export default class UserController {
  static login = async (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
      config.googleId,
      config.googleSecret,
      /*
       * This is where Google will redirect the user after they
       * give permission to your application
       */
      `http://localhost:4000/v1/google/token`
    );

    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];
    try {
      let authLink = await oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: scopes,
      });
      return okRes(res, { authLink });
    } catch (error) {
      return errRes(res, error);
    }
  };

  static getLogintoken = async (req, res) => {
    let user;
    const oauth2Client = new google.auth.OAuth2(
      config.googleId,
      config.googleSecret,
      `http://localhost:4000/v1/google/token`
    );
    if (!req.query.code) return errRes(res, `No code provided as query`);
    const { tokens } = await oauth2Client.getToken(req.query.code);

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        return errRes(res, error.message);
      });

    user = await User.findOne({ where: { googleId: googleUser.id } });

    if (!user) {
      await User.create({
        googleName: googleUser.name,
        userName: googleUser.name,
        googlePicture: googleUser.picture,
        googleEmail: googleUser.email,
        googleVerifiedEmail: googleUser.verified_email,
        googleId: googleUser.id,
      }).save();
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET
      );
      return okRes(res, { user, token});
    }

    if(user){
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET
      );

      return okRes(res, {token:token});
    }
  };
}
