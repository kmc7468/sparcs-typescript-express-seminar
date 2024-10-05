import express from "express";
import accountdb from "../modules/accountdb";
import filedb from "../modules/filedb"
import z from "zod";

const router = express.Router();
let login = false;
let myaccount = {id: "", password: "", name: ""};

const accountobj = z.object({
    id: z.string(),
    password: z.string(),
    name: z.string()
})

const editaccountobj = z.object({
    id: z.string(),
    password: z.string(),
    newpassword: z.string(),
    newname: z.string()
})

const fileobj = z.object({
    name: z.string(),
    path: z.string()
})

const downloadobj = z.object({
    name: z.string()
})

const shareobj = z.object({
    name: z.string(),
    newaccount: z.object({
        id: z.string(),
        password: z.string(),
        name: z.string()
    })
})

router.get("/register", (req, res) => { // add account
    try {
        const zodobj = accountobj.parse(req.body);
        const { id, password, name } = zodobj;
        accountdb.addaccount(id, password, name);
        res.json({result: "okay"});
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
})

router.get("/deleteaccount", (req, res) => {
    try {
        const zodobj = accountobj.parse(req.body);
        const { id, password, name } = zodobj;
        let deleteresult = accountdb.delaccount(id, password);
        res.json({ result: deleteresult });
    }
    catch (e) {
        res.status(500).json({error : e});
    }
})

router.get("/editaccount", (req, res) => {
    try {
        const zodobj = editaccountobj.parse(req.body);
        const { id, password, newpassword, newname } = zodobj;
        let editresult = accountdb.editaccount(id, password, newpassword, newname);
        res.json({ result: editresult });
    }
    catch (e) {
        res.status(500).json({error : e});
    }
})

router.get("/login", (req, res) => {
    try {
        const zodobj = accountobj.parse(req.body);
        const {id, password, name} = zodobj;
        let acc = accountdb.getbyid(id);
        if (acc === undefined) {
            res.json({ result: `no account of id: ${id}`});
        }
        else if (acc.password === password) {
            login = true;
            myaccount = {id: id, password: password, name: name};
            res.json({result: "login success"})
        }
        else {
            res.json({result: "wrond password"});
        }
    }
    catch (e) {
        res.status(500).json({error : e});
    }
})

router.get("/upload", (req, res) => {
    try {
        const zodobj = fileobj.parse(req.body);
        const { name, path } = zodobj;
        filedb.addfile(name, path, myaccount);
        res.json({result: "okay"});
    }
    catch (e) {
        res.status(500).json({error: e});
    }
})

router.get("/download", (req, res) => {
    try {
        const zodobj = downloadobj.parse(req.body);
        const {name} = zodobj;
        let downloadres = filedb.getfile(name, myaccount);
        res.json({result: downloadres});
    }
    catch (e) {
        res.status(500).json({error: e});
    }
})

router.get("/deletefile", (req, res) => {
    try {
        const zodobj = fileobj.parse(req.body);
        const { name, path } = zodobj;
        let delresult = filedb.delfile(name, myaccount);
        res.json({result: delresult});
    }
    catch (e) {
        res.status(500).json({error : e})
    }
})

router.get("/share", (req, res) => {
    try {
        const zodobj = shareobj.parse(req.body);
        const {name, newaccount } = zodobj;
        let result = filedb.shareauthority(name, myaccount, newaccount);
        res.status(500).json({result: result});
    }
    catch (e) {
        res.status(500).json({error: e})
    }
})