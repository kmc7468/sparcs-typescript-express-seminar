class TASKDB {
    static inst: TASKDB;
    static getInst = () => {
      if (!TASKDB.inst) TASKDB.inst = new TASKDB();
      return TASKDB.inst;
    };
  
    id = 1; itemCount = 1;
    LtaskDataDB = [ { id: 0, title: "test1", check: "x" } ];
  
    selectItems = (count: number) => {
      if (count > this.itemCount) return { success: false, data: "Too many items queried" };
      if (count < 0) return { success: false, data: "Invalid count provided" };
      else return { success: true, data: this.LtaskDataDB.slice(0, count) };
    };
  
    insertItem = (item: { title: string; check: string }) => {
      this.LtaskDataDB.push({ id: this.id, ...item });
      this.id++; this.itemCount++;
      return true;
    };
  
    deleteItem = (id: number) => {
      let BItemDeleted = false;
      this.LtaskDataDB = this.LtaskDataDB.filter((value) => {
        const match = value.id === id;
        if (match) BItemDeleted = true;
        return !match;
      });
      if (BItemDeleted) this.itemCount--;
      return BItemDeleted;
    };
    //여기가 수정한 부분
    editItem = (id: number, newTitle: string, newcheck: string) => {
      const index = this.LtaskDataDB.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.LtaskDataDB[index].title = newTitle;
        this.LtaskDataDB[index].check = newcheck;
        return true;
      } else {
        return false;
      }
    };
    //
  }
  
  export default TASKDB.getInst();
  