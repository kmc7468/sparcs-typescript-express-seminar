class DiaryDB {
  static inst: DiaryDB;
  static getInst = () => {
    if (!DiaryDB.inst) DiaryDB.inst = new DiaryDB();
    return DiaryDB.inst;
  };

  id = 1; 
  itemCount = 1;
  LDataDB = [ { id: 0, title: "오늘의 하루", content: "참 힘든 하루였다", rating: 1 } ];

  selectItems = (count: number) => {
    if (count > this.itemCount) return { success: false, data: "Too many items queried" };
    if (count < 0) return { success: false, data: "Invalid count provided" };
    else return { success: true, data: this.LDataDB.slice(0, count) };
  };

  insertItem = (item: { title: string; content: string, rating: number }) => {
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
  
  editItem = (item: { id: number; newTitle: string; newContent: string, newRating: number }) => {
    var { id, newTitle, newContent, newRating } = item;
    var selected = this.LDataDB.find((value) => {
      return value.id === id;
    });
    if (selected) {
      selected.title = newTitle;
      selected.content = newContent;
      selected.rating = newRating
      return true;
    }
    return false;
  };
}

export default DiaryDB.getInst();
