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
        try {
            const {data, comment} = await boards.detailBoard(id);
            return {data, comment};
        } catch (error) {
            console.log("DetailBoard controller error", error);
        }
    },

}

module.exports = boardC;
