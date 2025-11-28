import express from "express";
import postStore from "../modules/postStore";

const router = express.Router();

// 게시글 조회 (Read)
router.get("/getPost", (req, res) => {
  try {
    // 1. query에서 count를 가져와서 숫자로 변환
    const count = parseInt(req.query.count as string, 10);
    
    // 2. postStore에서 게시글 조회
    const result = postStore.selectPosts(count);
    
    // 3. 성공하면 게시글 목록 반환, 실패하면 에러 메시지 반환
    if (result.success) {
      res.json(result.data.map(({ id, ...post }) => ({
        ...post,
        id: id.toString(),
      })));
    } else {
      res.status(400).json({ error: result.data });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// 게시글 작성 (Create)
// Body: { title, content, author }
router.post("/addPost", (req, res) => {
  try {
    // 1. Body에서 title, content, author 추출
    const { title, content, author } = req.body;
    
    // 2. postStore에 새 게시글 추가
    const result = postStore.insertPost({ title, content, author });
    
    // 3. 결과 반환
    if (result) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// 게시글 수정 (Update)
// Body: { id, newTitle, newContent }
router.post("/editPost", (req, res) => {
  try {
    // 1. Body에서 id, newTitle, newContent 추출
    const { id, newTitle, newContent } = req.body;
    
    // 2. postStore에서 게시글 수정
    const result = postStore.editPost(
      parseInt(id as string, 10),
      newTitle,
      newContent
    );
    
    // 3. 결과 반환
    if (result) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// 게시글 삭제 (Delete)
// Body: { id }
router.post("/deletePost", (req, res) => {
  try {
    // 1. Body에서 id 추출
    const { id } = req.body;
    
    // 2. postStore에서 게시글 삭제
    const result = postStore.deletePost(parseInt(id as string, 10));
    
    // 3. 결과 반환
    if (result) {
      res.json({ isOK: true });
    } else {
      res.status(500).json({ isOK: false });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;