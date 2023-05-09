const {mysql} = require("./config");

const boards = {
    // 테이블 초기화

    // 게시글 목록 반환
    viewBoardAll : async () => {
        try {
            const [data] = await mysql.query("SELECT id, title, DATE_FORMAT(time, '%y-%m-%d') AS time, writer FROM Board");
            return data;
        } catch (error) {
            console.log("viewBoardAll models error",error);
        }
    },

    // 게시글 상세 반환(댓글, 좋아요 포함)
    detailBoard : async (id) => {
        try {
            const [data] = await mysql.query("SELECT Board.id, title, content, DATE_FORMAT(time, '%Y-%m-%d %T') AS time, writer, count(Likes.id) AS likes FROM Board INNER JOIN Likes ON Board.id=Likes.board_id WHERE Board.id = ?", [id]);
            const [comment] = await mysql.query("SELECT id, content, DATE_FORMAT(time, '%Y-%m-%d %T') AS time, name FROM Comment WHERE board_id = ?", [id]);
            return {data:data[0], comment};
        } catch (error) {
            console.log("detailBoard models error",error);
        }
    },

    // 게시글 추가

    // 게시글 수정

    // 게시글 삭제

    // 게시글 좋아요 누르기

    // 게시글 댓글 달기


}

// boards.detailBoard(2);

module.exports = boards;