/***************************
 * Assignment #4: Added a new router that includes CRUD.
 * ---------------
 * <To do>
 * - Link to homepage
 * <Done>
 * - Implement TodoDB
 * - Implement BE
 * - Implement FE
 * - Design (give up)
 * - Test and Debug (probably)
 ****************************/

import React from "react";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
import "./css/todo.css";

interface IAPIResponse {
  id: number;
  content: string;
  due: Date;
  state: string;
};

const initDate = new Date();

const TodoPage = (props: {}) => {
  const [ LAPIResponse, setLAPIResponse ] = React.useState<IAPIResponse[]>([]);
  const [ NPostCount, setNPostCount ] = React.useState<number>(0);
  const [ SNewPostDue, setSNewPostDue ] = React.useState<Date>(initDate);
  const [ SNewPostContent, setSNewPostContent ] = React.useState<string>("");
  const [ SNewPostState, setSNewPostState ] = React.useState<string>("");
  const [ SSearchItem, setSSearchItem ] = React.useState<string>("Not started");
  const [ SEditPostId, setSEditPostId ] = React.useState<number | null>(null);
  const [ SEditPostState, setSEditPostState ] = React.useState<string>("");

  React.useEffect( () => {
  let BComponentExited = false;
  const asyncFun = async () => {
    const { data } = await axios.get<IAPIResponse[]>( SAPIBase + `/todo/getTodo?&search=${ SSearchItem }`);
    console.log(data);
    if (BComponentExited) return;
    setLAPIResponse(data);
  };
  asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
  return () => { BComponentExited = true; }
  }, [ NPostCount, SSearchItem, SEditPostId ]);

  const createNewPost = () => {
  const asyncFun = async () => {
    await axios.post( SAPIBase + '/todo/addTodo', { content: SNewPostContent, due: SNewPostDue, state: SNewPostState } );
    setNPostCount(NPostCount + 1);
    setSNewPostContent("");
    setSNewPostDue(initDate);
    setSNewPostState("");
  }
  asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const deletePost = (id: number) => {
  const asyncFun = async () => {
    await axios.post( SAPIBase + '/todo/deleteTodo', { id: id } );
    setNPostCount(Math.max(NPostCount - 1, 0));
  }
  asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const editPost = () => {
  const asyncFunc = async () => {
    await axios.post( SAPIBase + '/todo/editTodo', { id: SEditPostId, newState: SEditPostState } );
    setSEditPostId(null);
    setSEditPostState("");
  }
  asyncFunc().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  return (
  <div className={"todo"}>
    <Header/>
    <h2>Todo</h2>
    <div>Number of todos: {NPostCount}</div>
    <div className={"todo-length-input"}>
      Filter by state: &nbsp;&nbsp;
      <select id={"post-filter-state"} name={"post-filter-state"} value={SSearchItem} onChange={ (e) => setSSearchItem( e.target.value ) }>
        <option value="Not started">Not started</option>
        <option value="Working in Progress">Working in Progress</option>
        <option value="Done">Done</option>
        <option value="">All</option>
      </select>
    </div>
    <div className={"todo-list"}>
    { LAPIResponse.map( (val, i) =>
      <div key={i} className={"todo-item"}>
        { SEditPostId !== val.id && <div className={"edit-item"} 
          onClick={(e) => { setSEditPostId(val.id); setSEditPostState(val.state); }}>Edit state</div> }
        { <div className={"delete-item"} onClick={(e) => deletePost(val.id)}>ⓧ</div> }
        <p className={"todo-due"}>Due: { (val.due).toString() }</p>
        <p className={"todo-body"}>Content: { val.content }</p>
      </div>
    ) }
    {
      SEditPostId !== null
      ?
      <div className={"todo-item-add"}>
        State: 
        <select id={"post-filter-state"} name={"post-filter-state"} value={SEditPostState} onChange={ (e) => setSEditPostState( e.target.value ) }>
          <option value="Not started">Not started</option>
          <option value="Working in Progress">Working in Progress</option>
        <option value="Done">Done</option>
      </select>
        <div className={"post-add-button"} onClick={(e) => editPost()}>Edit</div>
      </div>
      :
      <div className={"todo-item-add"}>
        Due: <input type={"text"} placeholder={"MM-DD-YYYY"} maxLength={10} onChange={(e) => {setSNewPostDue(new Date(e.target.value))}}/>
        &nbsp;&nbsp; Content: <input type={"text"} value={SNewPostContent} onChange={(e) => setSNewPostContent(e.target.value)}/>
        <div className={"post-add-button"} onClick={(e) => createNewPost()}>Add</div>
      </div>
    }
    </div>
  </div>
  );
}

export default TodoPage;