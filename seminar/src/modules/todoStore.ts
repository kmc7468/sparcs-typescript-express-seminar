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
    
    id = 2; itemCount = 2;

    LDataDB = [
                {id: 0, content: "SPARCS NEWBIE PROGRAM #4", due: (new Date("10-06-2024")), state: "Not started"},
                {id: 42, content: "git 계정 실수로 commit이 다른 계정에서 올라갔다는 걸 과제 다 하고 봤네...", due: (new Date("01-01-1970")), state: "Done"}
              ]

    selectItems = (state: string) => {
      try {
        /* console.log("[TODO-DB] Select item | state: ", state); */
        let data = undefined;
        if (state !== "") {
          data = this.LDataDB.filter((value) => {
            return value.state === state;
          });
        } else {
          data = this.LDataDB;
        }
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
  