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
  
  updateItem = (item: { id: number; title: string; content: string }) => {
    let BItemUpdated = false;
    this.LDataDB = this.LDataDB.map((feed) => {
      if (feed.id === item.id) {
        BItemUpdated = true;
        return { ...feed, title: item.title, content: item.content };
      }
      return feed;
    });
    return BItemUpdated;
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
