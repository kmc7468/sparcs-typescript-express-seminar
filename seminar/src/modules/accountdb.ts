// const accountobj = z.object({
//     id: z.string(),
//     password: z.string(),
//     name: z.string()
// })

class accountDB {
    static inst: accountDB;
    static getInst = () => {
      if (!accountDB.inst) accountDB.inst = new accountDB();
      return accountDB.inst;
    };

    accountdb = [{id: "admin", password: "sparcs", name: "admin"}];
    accnum = 1;

    getbyid = (id: string) => {
        let accountinfo = this.accountdb.find((element) => {
            return element.id === id;
          });
        return accountinfo;
    }
    
    getacclist = (id: string, password: string) => {
        if (id === "admin") {
            let realpwd = this.getbyid("admin")?.password;
            if (realpwd === password) {
                return "okay";
            }
            else {
                return "wrongpwd";
            }
        }
        else {
            return "notadmin";
        }
    }

    addaccount = (id: string, password: string, name: string) => {
        this.accountdb.push({id: id, password: password, name: name});
        this.accnum++;
        return true;
    }

    delaccount = (id: string, password: string) => {
        let acc = this.getbyid(id);
        if (acc === undefined) {
            return "noacc";
        }
        else {
            if (acc.password === password) {
                return "okay";
            }
            else {
                return "wrongpwd";
            }
        }
    }

    editaccount = (id: string, originpwd: string, newpwd: string, newname: string) => {
        let acc = this.getbyid(id);
        if (acc === undefined) {
            return "noacc";
        }
        else {
            if (acc.password === originpwd) {
                acc.password = newpwd;
                acc.name = newname;
                return "okay"
            }
            else {
                return "wrongpwd";
            }
        }
    }
}
export default accountDB.getInst();