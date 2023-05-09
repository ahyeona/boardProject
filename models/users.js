const {mysql} = require("./config");

const users = {
    // 이메일 중복확인
    emailCheck: async (email) => {
        try {
            // 해당 이메일 값을 가진 유저 정보 반환
            const [data] = await mysql.query("SELECT * FROM User WHERE email = ?", [email]);
            return data[0];
        } catch (error) {
            console.log("idcheck에러", error);
        }
    },

    // 닉네임 중복확인
    nickCheck: async (nickname) => {
        try {
            // 해당 닉네임 값을 가진 유저 정보 반환
            const [data] = await mysql.query("SELECT * FROM User WHERE nickname = ?", [nickname]);
            return data[0];
        } catch (error) {
            console.log("nickcheck에러", error);
        }
    },

    // user 추가
    insertUser: async (email, password, nickname) => {
        try {
            await mysql.query("INSERT INTO User (email, password, nickname) VALUES (?,?,?)", [email, password, nickname]);
        } catch (error) {
            console.log("insertUser에러", error);
        }
    },

    // 아이디 비밀번호 확인
    loginUser: async (email, password) => {
        try {
            const [data] = await mysql.query("SELECT * FROM User WHERE email = ? AND password = ?", [email, password]);
            return data[0];
        } catch (error) {
            console.log("loginUser에러", error);
        }
    }

};

// users.emailCheck("fdf@gmail.com");
// users.nickCheck("sfdfs");
// users.insertUser("9009dsfjkd@nagm.com", "dsjkfjslkdjf", "dsfsddf");
// users.loginUser("dsfjkd@nagm.com", "dsjkfjslkdjf");

module.exports = users;