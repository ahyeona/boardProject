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
            await boards.insertBoard(title, content, writer);
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
        const {id, title, content} = req.body;
        try {
            await boards.updateBoard(id, title, content);
            return id;
        } catch (error) {
            console.log("UpdateBoard controller error", error);
        }
    },

    DeleteBoard : async (req, res) => {
        const {id} = req.params;
        try {
            await boards.deleteBoard(id);
        } catch (error) {
            console.log("DeleteBoard controller error", error);
        }
    }

}

module.exports = boardC;
