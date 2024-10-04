interface Chat {
  id: number;
  title: string;
}

class ChatDB {
  static inst: ChatDB;
  static getInst = () => {
    if (!ChatDB.inst) ChatDB.inst = new ChatDB();
    return ChatDB.inst;
  };

  id = 1;
  itemCount = 1;
  LDataDB: Chat[] = [{ id: 0, title: "test1" }];

  selectLength = () => {
    return { success: true, data: this.itemCount };
  };

  selectItems = (count: number) => {
    if (count > this.itemCount)
      return { success: false, data: "Too many items queried" };
    if (count < 0) return { success: false, data: "Invalid count provided" };
    else return { success: true, data: this.LDataDB.slice(0, count) };
  };

  insertItem = (item: { title: string }) => {
    this.LDataDB.push({ id: this.id, ...item });
    this.id++;
    this.itemCount++;
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

  updateItem = (item: Chat) => {
    let BItemUpdated = false;
    this.LDataDB = this.LDataDB.map((value) => {
      if (value.id === item.id) {
        BItemUpdated = true;
        return { id: item.id, title: item.title };
      } else return value;
    });
    return BItemUpdated;
  };
}

export default ChatDB.getInst();
