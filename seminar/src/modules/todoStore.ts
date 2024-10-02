interface TodoItem {
    id: number;
    content: string;
    due: Date;
    state: string;
};

class TodoDB {
    static inst: TodoDB;
    static getInst = () => {
      if (!TodoDB.inst) TodoDB.inst = new TodoDB();
      return TodoDB.inst;
    };
    
    id = 1; itemCount = 1;

    LDataDB = [] as TodoItem[];
  
    selectItems = (count: number) => {
      if (count > this.itemCount) return { success: false, data: "Too many items queried" };
      if (count < 0) return { success: false, data: "Invalid count provided" };
      else return { success: true, data: this.LDataDB.slice(0, count) };
    };
  
    insertItem = (item: { content: string, due: Date, state: string }) => {
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

    editItem = (id: number, state: string) => {
        let BItemEdited = false;
        const targetItem = this.LDataDB.find((value, id) => {
            return value.id === id;
        })
        if (typeof targetItem !== "undefined") {
            targetItem.state = state;
            BItemEdited = true;
        }
        return BItemEdited;
    }
  }
  
  export default TodoDB.getInst();
  