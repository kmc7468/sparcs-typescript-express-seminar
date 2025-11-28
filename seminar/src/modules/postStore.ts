class PostDB {
  static inst: PostDB;
  static getInst = () => {
    if (!PostDB.inst) PostDB.inst = new PostDB();
    return PostDB.inst;
  };

  id = 1;
  
  itemCount = 1;
  
  posts = [
    { id: 0, title: "첫 번째 게시글", content: "안녕하세요!", author: "admin" }
  ];

  // 게시글 조회 (Read)
  selectPosts = (count: number) => {
    if (count > this.itemCount) {
      return { success: false as const, data: "Too many posts queried" };
    }
    if (count < 0) {
      return { success: false as const, data: "Invalid count provided" };
    }
    return { success: true as const, data: this.posts.slice(0, count) };
  };

  // 게시글 작성 (Create)
  insertPost = (post: { title: string; content: string; author: string }) => {
    this.posts.push({ id: this.id, ...post });
    this.id++;
    this.itemCount++;
    return true;
  };

  // 게시글 수정 (Update)
  editPost = (id: number, newTitle: string, newContent: string) => {
    const post = this.posts.find((p: { id: number; title: string; content: string; author: string }) => p.id === id);
    if (post) {
      post.title = newTitle;
      post.content = newContent;
      return true;
    }
    return false;
  };

  // 게시글 삭제 (Delete)
  deletePost = (id: number) => {
    let deleted = false;
    this.posts = this.posts.filter((p: { id: number; title: string; content: string; author: string }) => {
      const match = p.id === id;
      if (match) deleted = true;
      return !match;
    });
    if (deleted) this.itemCount--;
    return deleted;
  };
}

export default PostDB.getInst();