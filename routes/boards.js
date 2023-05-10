const express = require("express");

const router = express.Router();

const boards = require("../controllers/boards");
const { render } = require("ejs");

// 게시판 목록
router.get("/", async (req, res) => {
    const {user} = req.session;
    try {
        const data = await boards.ViewBoardAll(req, res);
        res.render("boards/list", {data, user});
    } catch (error) {
        console.log("게시판 목록 render error",error);
    }
});

// 게시판 상세
router.get("/detail/:id", async (req, res) => {
    try {
        const {data, comment, likebool} = await boards.DetailBoard(req, res);
        const {user} = req.session;
        res.render("boards/detail", {data, comment, user, likebool});

    } catch (error) {
        console.log("게시판 상세 render error",error);
    }
});

// 게시글 등록 페이지
router.get("/insert", async (req, res) => {
    const {user} = req.session;
    try {
        if (user) {
            res.render("boards/insert", {user});
        } else {
            res.redirect("/users/login");
        }
    } catch (error) {
        console.log("게시글 등록 render error",error);
    }
});

// 게시글 등록
router.post("/insert", async (req, res) => {
    try {
        await boards.InsertBoard(req, res);
        res.redirect("/boards");
    } catch (error) {
        console.log("게시글 등록 error",error);
    }
});

// 게시글 좋아요
router.post("/likes", async (req, res) => {
    const {user} = req.session;
    try {
        if (user) {
            const board_id = await boards.LikeBoard(req, res);
            res.redirect("/boards/detail/"+board_id);
        } else {
            res.redirect("/users/login");
        }
    } catch (error) {
        console.log("게시글 좋아요 error",error);
    }
});

// 댓글달기
router.post("/add_comment", async (req, res) => {
    try {
        const board_id = await boards.AddComment(req, res);
        res.redirect("/boards/detail/"+board_id);
    } catch (error) {
        console.log("게시글 댓글 error",error);
    }
});

// 수정 페이지
router.get("/update/:id", async (req, res) => {
    const {user} = req.session;
    try {
        const {data} = await boards.DetailBoard(req, res);
        res.render("boards/update", {data, user});
    } catch (error) {
        console.log("게시글 수정 render error",error);
    }
});

// 수정
router.post("/update/:id", async (req, res) => {
    try {
        const board_id = await boards.UpdateBoard(req, res);
        res.redirect("/boards/detail/"+board_id);
    } catch (error) {
        console.log("게시글 수정 render error",error);
    }
});

// 삭제
router.get("/delete/:id", async (req, res) =>{
    try {
        await boards.DeleteBoard(req, res);
        res.redirect("/boards");
    } catch (error) {
        console.log("게시글 삭제 error",error);
    }
});

module.exports = router;