/***************************
 * Assignment #4: Added a new router that includes CRUD.
 * ---------------
 * <To do>
 * - Design (really??)
 * - Test and Debug
 * - Link to homepage
 * <Done>
 * - Implement TodoDB
 * - Implement BE
 * - Implement FE
 ****************************/

interface ITodoItem {
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
    
    id = 0; itemCount = 0;

    LDataDB = [] as ITodoItem[];
    
    selectItems = (state: string) => {
      try {
        /* console.log("[TODO-DB] Select item | state: ", state); */
        const data = this.LDataDB.filter((value) => {
          return value.state === state;
        });
        return { success: true, data: data };
      } catch (e) {
        return { success: false, data: undefined };
      }
    };
  
    insertItem = (item: { content: string, due: Date, state: string }) => {
      /* console.log("[TODO-DB] Insert item: ", item); */
      this.LDataDB.push({ id: this.id, ...item });
      this.id++; this.itemCount++;
      /* console.log("[TODO-DB] Inserted item: ", this.LDataDB.find((value) => { return value.id+1 === this.id}));
      console.log(this.id, this.itemCount); */
      return true;
    };
  
    deleteItem = (id: number) => {
      let BItemDeleted = false;
      console.log("[TODO-DB] Delete item of id: ", id);
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
        const targetItem = this.LDataDB.find((value) => {
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
  