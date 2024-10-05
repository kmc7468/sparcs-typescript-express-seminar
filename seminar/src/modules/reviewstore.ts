class ReviewDB {
    static inst: ReviewDB;
    static getInst = () => {
      if (!ReviewDB.inst) ReviewDB.inst = new ReviewDB();
      return ReviewDB.inst;
    };
  
    id = 1; itemCount = 1;
    LDataDB = [{id:0, name:"restaurant", menu : "rice", star: 5}];
  
    selectReview = (name: string) => {
        let selected = this.LDataDB.filter((value) => {
            const match = value.name === name;
            return match;
          });
        if (selected.length>0) return {success : true, data : selected};
        else return {success : false, data : this.LDataDB}
    };


    insertReview = (id:number, item:{name : string, menu: string; star: number}) => {
      this.LDataDB.push({id:this.id, ...item });
      this.id++; this.itemCount++;
      return true;
    };
  
    deleteReview = (id:number) => {
      let Bnameselected = false;
      this.LDataDB = this.LDataDB.filter((value) => {
        const match = value.id === id;
        if (match) Bnameselected = true;
        return !match;
      });
      if (Bnameselected) this.itemCount--;
      return Bnameselected;
    };
  
  
    editReview = (id:number, item:{name : string, menu: string; newStar: number}) => {
        this.LDataDB[id].star=item.newStar;
        return true;
    };
  
  }
    export default ReviewDB.getInst();
