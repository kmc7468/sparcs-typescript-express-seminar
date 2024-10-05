class FeedDB {
  static inst: FeedDB;
  static getInst = () => {
    if (!FeedDB.inst) FeedDB.inst = new FeedDB();
    return FeedDB.inst;
  };

  id = 0; itemCount = 0;
  LDataDB: any[] = [];

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

  editItem = (id: number, newTitle: string, newContent: string) => {
    let BItemEdited = false;
    
    for (let i=0; i<this.itemCount; i++) {
      if (this.LDataDB[i].id === id) {
        this.LDataDB[i].title = newTitle;
        this.LDataDB[i].content = newContent;
        BItemEdited = true;
        break;
      }
    }
    return BItemEdited;
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
}

export default FeedDB.getInst();
