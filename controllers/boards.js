const { boards } = require("../models");

const boardC = {
    ViewBoardAll : async (req, res) => {
        try {
            const data = await boards.viewBoardAll();
            return data;
        } catch (error) {
            console.log("ViewBoardAll controller error", error);
        }
    },

    DetailBoard : async (req, res) => {
        const {id} = req.params;
        let likebool;
        let checkLike;
        try {
            const {data, comment} = await boards.detailBoard(id);

            if (req.session.user) {
                const user_id = req.session.user.id;
                checkLike = await boards.checkLike(user_id, id);
            }

            if (checkLike) {
                likebool = true;
            } else {
                likebool = false;
            }
            return {data, comment, likebool};
        } catch (error) {
            console.log("DetailBoard controller error", error);
        }
    },

    InsertBoard : async (req, res) => {
        const {title, content, writer} = req.body;
        try {
            const board_id = await boards.insertBoard(title, content, writer);
            if (req.file) {
                const filepath = req.file.filename;
                await boards.insertImg(board_id, filepath);
            }
        } catch (error) {
            console.log("InsertBoard controller error", error);
        }
    },

    LikeBoard : async (req, res) => {
        const {user_id, board_id} = req.body;
        try {
            await boards.likeBoard(user_id, board_id);
            return board_id;
        } catch (error) {
            console.log("LikeBoard controller error", error);
        }
    },

    // CheckLike : async (req, res) => {
    //     const {user_id, board_id} = req.body;
    //     try {
    //         const data = await boards.checkLike(user_id, board_id);
    //         return data;
    //     } catch (error) {
    //         console.log("CheckLike controller error", error);
    //     }
    // },

    AddComment : async (req, res) => {
        const { board_id, content, name } = req.body;
        try {
            await boards.addComment(board_id, content, name);
            return board_id;
        } catch (error) {
            console.log("AddComment controller error", error);
        }
    },

    UpdateBoard : async (req, res) => {
        const {id, title, content, img} = req.body;
        try {
            if (req.file) {
                if (img) {
                    // 기존 이미지파일 삭제
                    await boards.deleteImg(img);
                }
                const filepath = req.file.filename;
                await boards.updateBoard(id, title, content, filepath);

            } else {
                await boards.updateBoard(id, title, content);
            }

            return id;
        } catch (error) {
            console.log("UpdateBoard controller error", error);
        }
    },

    DeleteBoard : async (req, res) => {
        const {id} = req.params;
        try {
            // 이미지 삭제
            const filepath = await boards.getfilename(id);
            await boards.deleteImg(filepath);

            await boards.deleteBoard(id);
        } catch (error) {
            console.log("DeleteBoard controller error", error);
        }
    }

}

module.exports = boardC;
