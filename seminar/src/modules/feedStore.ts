class FeedDB {
  static inst: FeedDB;
  static getInst = () => {
    if (!FeedDB.inst) FeedDB.inst = new FeedDB();
    return FeedDB.inst;
  };

  id = 1; itemCount = 1;
  LDataDB = [ { id: 0, title: "test1", content: "Example body" } ];

  selectItems = (count: number) => {
    if (count > this.itemCount) return { success: false, data: "Too many items queried" };
    if (count < 0) return { success: false, data: "Invalid count provided" };
    else return { success: true, data: this.LDataDB.slice(0, count) };
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

  editItem = (item: { id: number; newTitle: string; newContent: string }) => {
    const { id, newTitle, newContent } = item;
    let ididx = this.LDataDB.findIndex((element) => {
      return element.id === id;
    });
    if (ididx !== -1) {
      this.LDataDB[ididx] = { id: id, title: newTitle, content: newContent };
      return true;
    }
    else {
      return false;
    }
  };
}

export default FeedDB.getInst();
