/***************************
 * Assignment #4: Added a new router that includes CRUD.
 * ---------------
 * <To do>
 * - Implement BE for todo router
 *   - Implement schema validation (Done)
 *   - Implement routers (Done)
 *   - Test and Debug
 * - Implement FE for todo router
 *   - Implement req-res handling
 *   - Implement user interaction
 *   - Design (really??)
 * - Test TodoDB
 * - Link to homepage
 * <Done>
 * - Write TodoDB
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
        const data = this.LDataDB.filter((value) => {
          return value.state === state;
        });
        return { success: true, data: data };
      } catch (e) {
        return { success: false, data: undefined };
      }
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
  