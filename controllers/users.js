const { users } = require("../models");

const userC = {
    // 이메일 중복확인
    EmailCheck : async (req, res) => {
        const { email } = req.body;
        try {
            const data = await users.emailCheck(email);
            return data;
        } catch (error) {
            console.log("EmailCheck controller 에러", error);
        }
    },

    // 닉네임 중복확인
    NickCheck : async (req, res) => {
        const { nickname } = req.body;
        try {
            const data = await users.nickCheck(nickname);
            return data;
        } catch (error) {
            console.log("nickCheck controller 에러", error);
        }
    },

    // 회원가입
    InsertUser : async (req, res) => {
        const { email, password, nickname } = req.body;
        try {
            await users.insertUser(email, password, nickname);
        } catch (error) {
            console.log("InsertUser controller 에러", error);
        }
    },



    // 로그인
    Login : async (req, res) => {
        try {
            const { email, password } = req.body;
            const data = await users.loginUser(email, password);
            return data;
        } catch (error) {
            console.log("Login controller 에러", error);
        }
    }

}

module.exports = userC;