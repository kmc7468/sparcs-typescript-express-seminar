class ExamDB {
    static inst: ExamDB;
    static getInst = () => {
      if (!ExamDB.inst) ExamDB.inst = new ExamDB();
      return ExamDB.inst;
    };
  
    id = 10; itemCount = 10;
    LDataDB = [ { id: 0, course: "CS300", date: "10/24" } ];
  
    selectItems = (count: number) => {
      if (count > this.itemCount) return { success: false, data: "Too many items queried" };
      if (count < 0) return { success: false, data: "Invalid count provided" };
      else return { success: true, data: this.LDataDB.slice(0, count) };
    };
  
    insertItem = (item: { course: string; date: string }) => {
      this.LDataDB.push({ id: this.id, ...item });
      this.id++; this.itemCount++;
      return true;
    };
    
    updateItem = (item: { id: number; course: string; date: string }) => {
      let BItemUpdated = false;
      this.LDataDB = this.LDataDB.map((exam) => {
        if (exam.id === item.id) {
          BItemUpdated = true;
          return { ...exam, title: item.course, content: item.date };
        }
        return exam;
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
  
  export default ExamDB.getInst();
  