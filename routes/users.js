const express = require("express");

const router = express.Router();

const users = require("../controllers/users");

router.get("/login", (req, res) => {
    try {
        res.render("users/login");
    } catch (error) {
        console.log("login render error", error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const data = await users.Login(req, res);
        if (data) {
            console.log("로그인 성공");
            // 세션 생성
            req.session.user = {id: data.id, nickname: data.nickname};

            req.session.save(()=> {
                res.redirect("/boards");// 게시판 목록 페이지로 이동
            })

        } else {
            console.log("로그인 실패");
            res.render("users/loginerror", {data : "로그인실패"});

        }
    } catch (error) {
        console.log("login error", error);
    }
});

router.get("/signup", async (req, res) => {
    try {
        res.render("users/signup");

    } catch (error) {
        console.log("signup render error", error);
    }
});

router.post("/signup", async (req, res) => {
    try {
        const emailC = await users.EmailCheck(req, res);
        const nickC = await users.NickCheck(req, res);

        if (!emailC && !nickC) {
            // 둘다중복아님
            await users.InsertUser(req, res);
            res.redirect("/users/login");

        } else if (emailC && !nickC) {
            res.send("이메일 중복"); // 이메일 중복
        } else if (nickC && !emailC){
            res.send("닉네임 중복"); // 닉네임 중복
        } else {
            res.send("아이디, 닉네임 중복"); // 아이디 닉네임 중복
        }

    } catch (error) {
        console.log("signup error", error);
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log("로그아웃err",error);
            res.redirect("/boards/");
        } else {
            res.redirect("/users/login/");
        }
    });
});

// router.post("/emailcheck", async (req, res) => {
//     try {
//         const data = await users.EmailCheck(req, res);
//         if (data.length != 0) {
//             res.send(1); // 중복일때
//         } else {
//             res.send(0); // 중복아닐때
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

// router.post("/emailcheck", async (req, res) => {
//     try {
//         await users.EmailCheck(req, res);
//     } catch (error) {

//     }
// });

module.exports = router;