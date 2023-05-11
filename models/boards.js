const path = require("path");
const {mysql} = require("./config");

const fs = require('fs');

const imgdirpath = path.join(__dirname, '..', "public", "image");

const boards = {
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
            const [data] = await mysql.query("SELECT Board.id, title, content, DATE_FORMAT(time, '%Y-%m-%d %T') AS time, writer, img, count(Likes.id) AS likes FROM Board LEFT JOIN Likes ON Board.id=Likes.board_id WHERE Board.id = ?", [id]);
            const [comment] = await mysql.query("SELECT id, content, DATE_FORMAT(time, '%Y-%m-%d %T') AS time, name FROM Comment WHERE board_id = ?", [id]);
            return {data:data[0], comment};
        } catch (error) {
            console.log("detailBoard models error",error);
        }
    },

    // 게시글 추가
    insertBoard : async (title, content, writer) => {
        try {
            const [data] = await mysql.query("INSERT INTO Board(title, content, time, writer) VALUES (?,?, DEFAULT,?)", [title, content, writer]);
            return data.insertId;
        } catch (error) {
            console.log("insertBoard models error",error);
        }
    },

    // 게시글 수정
    updateBoard : async (id, title, content, img=null) => {
        try {
            if (img != null) {
                await mysql.query("UPDATE Board SET title = ?, content = ?, img=? WHERE id = ?", [title, content, img, id]);
            } else {
                await mysql.query("UPDATE Board SET title = ?, content = ? WHERE id = ?", [title, content, id]);
            }
        } catch (error) {
            console.log("updateBoard models error",error);
        }
    },

    // 게시글 삭제
    deleteBoard : async (id) => {
        try {
            await mysql.query("DELETE FROM board WHERE id=?;", [id]);
            // await mysql.query("DELETE FROM board WHERE id=?; SET @CNT = 0; UPDATE board SET board.id = @CNT:=@CNT+1; ALTER TABLE board AUTO_INCREMENT = 0;", [id]);
        } catch (error) {
            console.log("deleteBoard models error",error);
        }
    },

    // 게시글 좋아요 눌렀는지 확인
    checkLike : async (user_id, board_id) => {
        try {
            const [data] = await mysql.query("SELECT * FROM Likes WHERE user_id=? AND board_id=?", [user_id, board_id]);
            return data[0];
        } catch (error) {
            console.log("checkLike models error",error);
        }
    },


    // 게시글 좋아요 누르기
    likeBoard : async (user_id, board_id) => {
        try {
            await mysql.query("INSERT INTO Likes(user_id, board_id) VALUES(?,?)", [user_id, board_id]);
        } catch (error) {
            console.log("likeBoard models error",error);
        }
    },

    // 게시글 댓글 달기
    addComment : async (board_id, content, name) => {
        try {
            await mysql.query("INSERT INTO Comment(board_id, content, time, name) VALUES(?,?,DEFAULT,?)", [board_id, content, name]);
        } catch (error) {
            console.log("addComment models error",error);
        }
    },

    // 이미지 경로 mysql에 설정
    insertImg : async (board_id, filepath) => {
        try {
            await mysql.query("UPDATE Board SET img = ? WHERE id = ?", [filepath, board_id]);
        } catch (error) {
            console.log("insertImg models error", error)
        }
    },

    // 파일 삭제
    deleteImg : async (filepath) => {
        fs.unlink(path.join(imgdirpath, filepath), (err) => {
            if (err) {
              console.error("파일삭제에러", err);
            }
          });
    },

    // 이미지 이름 가져오기
    getfilename : async (board_id) => {
        try {
            const [data] = await mysql.query("SELECT img FROM Board WHERE id=?", [board_id]);
            return data[0].img;
        } catch (error) {
            console.log("checkLike models error",error);
        }
    },

}
module.exports = boards;