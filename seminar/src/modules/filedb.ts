// const fileobj = z.object({
//     name: z.string(),
//     accounts: z.object({
//         accountobj
//     }),
//     path: z.string()
// })

class fileDB {
    static inst: fileDB;
    static getInst = () => {
      if (!fileDB.inst) fileDB.inst = new fileDB();
      return fileDB.inst;
    };

    filedb = [{name: "asdfasdfasdf.txt", path: "something/idk/", account: [{}]}];

    getbyname = (name: string) => {
        let fileinfo = this.filedb.find((element) => {
            return element.name === name;
          });
        return fileinfo;
    }

    addfile = (name: string, path: string, account: object) => {
        this.filedb.push({ name: name, path: path, account: [account] });
        return true;
    }

    delfile = (name: string, account: object) => {
        let file = this.getbyname(name);
        if (file === undefined) {
            return "nofile";
        }
        else {
            let accexist = this.filedb.some((item) => {
                return JSON.stringify(item) === JSON.stringify(account)
            });
            if (accexist) {
                this.filedb = this.filedb.filter(item => item.name !== name);
                return "okay";
            }
            else {
                return "notokay"
            }
        }
    }
    
    getfile = (name: string, account: object) => {
        let file = this.getbyname(name);
        if (file === undefined) {
            return "nofile";
        }
        else {
            let accexist = this.filedb.some((item) => {
                return JSON.stringify(item) === JSON.stringify(account)
            });
            if (accexist) {
                return file.path;
            }
            else {
                return "notokay"
            }
        }
    }

    shareauthority = (name: string, account: object, newaccount: object) => {
        let file = this.getbyname(name);
        if (file === undefined) {
            return "nofile";
        }
        else {
            let accexist = this.filedb.some((item) => {
                return JSON.stringify(item) === JSON.stringify(account)
            });
            if (accexist) {
                file.account.push(newaccount);
                return "okay";
            }
            else {
                return "notokay";
            }
        }
    }
}
export default fileDB.getInst();