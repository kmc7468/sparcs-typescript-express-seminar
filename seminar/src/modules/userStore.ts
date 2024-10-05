class User {
  static inst: User;
  static getInst = () => {
    if (!User.inst) User.inst = new User();
    return User.inst;
  };

  LDataDB: any[] = [];

  selectItems = () => {
    return { success: true, data: this.LDataDB };
  };

  insertItem = (item: { name: string; email: string }) => {
    this.LDataDB.push({ ...item });
    return true;
  };

  deleteItem = (email:string) => {
    let BItemDeleted = false;
    this.LDataDB = this.LDataDB.filter((value) => {
      const match = value.email === email;
      if (match) BItemDeleted = true;
      return !match;
    });
    return BItemDeleted;
  };

  editItem = (newName:string, email:string) => {
    let BItemEdited = false;
    
    for (let i=0; i<this.LDataDB.length; i++) {
      if (this.LDataDB[i].email === email) {
        this.LDataDB[i].name = newName;
        BItemEdited = true;
        break;
      }
    }
    return BItemEdited;
  };
}



export default User.getInst();
