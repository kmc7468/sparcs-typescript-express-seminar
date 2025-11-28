class FeedDB {
  static inst: FeedDB;
  static getInst = () => {
    if (!FeedDB.inst) FeedDB.inst = new FeedDB();
    return FeedDB.inst;
  };

  id = 1; itemCount = 1;
  LDataDB = [ { id: 0, title: "test1", content: "Example body" } ];

  selectItems = (count: number) => {
    if (count > this.itemCount) return { success: false as const, data: "Too many items queried" };
    if (count < 0) return { success: false as const, data: "Invalid count provided" };
    else return { success: true as const, data: this.LDataDB.slice(0, count) };
  };

  insertItem = (item: { title: string; content: string }) => {
    this.LDataDB.push({ id: this.id, ...item });
    this.id++; this.itemCount++;
    return true;
  };

  deleteItem = (id: number) => {
    let BItemDeleted = false;
    this.LDataDB = this.LDataDB.filter((value) => {
      const match = value.id === id;
      if (match) BItemDeleted = true;
      return !match;
    });
    if (BItemDeleted) this.itemCount--;
    return BItemDeleted;
  };

  editItem = (id: number, newTitle: string, newContent: string) => {
    const item = this.LDataDB.find((value: { id: number; title: string; content: string }) => value.id === id);
    if (item) {
      item.title = newTitle;
      item.content = newContent;
      return true;
    }
    return false;
  };
}  // ← 클래스 닫는 중괄호

export default FeedDB.getInst();