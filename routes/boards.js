const express = require("express");

const router = express.Router();

const boards = require("../controllers/boards");

// 게시판 목록
router.get("/", async (req, res) => {
    try {
        const data = await boards.ViewBoardAll(req, res);
        res.render("boards/list", {data});
    } catch (error) {
        console.log("게시판 목록 render error",error);
    }
});

// 게시판 상세
router.get("/detail/:id", async (req, res) => {
    try {
        const {data, comment} = await boards.DetailBoard(req, res);
        res.render("boards/detail", {data, comment});

    } catch (error) {
        console.log("게시판 상세 render error",error);
    }
});




module.exports = router;