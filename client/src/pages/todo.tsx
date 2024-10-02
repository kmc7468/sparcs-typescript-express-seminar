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
  const [ SSearchItem, setSSearchItem ] = React.useState<string>("");
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
    <div className={"todo-length-input"}>
      Filter by state: &nbsp;&nbsp;
      <select id={"post-filter-state"} name={"post-filter-state"} onChange={ (e) => setSSearchItem( e.target.value ) }>
        <option value="not started">Not started</option>
        <option value="working in progress">Working in Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
    <div className={"todo-list"}>
    { LAPIResponse.map( (val, i) =>
      <div key={i} className={"todo-item"}>
        { SEditPostId !== val.id && <div className={"edit-item"} 
          onClick={(e) => { setSEditPostId(val.id); setSEditPostState(val.state); }}>Edit state</div> }
        { <div className={"delete-item"} onClick={(e) => deletePost(val.id)}>ⓧ</div> }
        {/* reference: https://stackoverflow.com/a/16714931 */}
        <p className={"todo-due"}>{ (val.due).toISOString().slice(0,10).replace(/-/g,"") }</p>
        <p className={"todo-body"}>{ val.content }</p>
      </div>
    ) }
    {
      SEditPostId !== null
      ?
      <div className={"todo-item-add"}>
        State: <input type={"text"} value={SEditPostState} onChange={(e) => setSEditPostState(e.target.value)}/>
        <div className={"post-add-button"} onClick={(e) => editPost()}>Edit</div>
      </div>
      :
      <div className={"todo-item-add"}>
        Due: <input type={"text"} value={"Due format must be MM-DD-YYYY"} onChange={(e) => setSNewPostDue(new Date(e.target.value))}/>
        Content: <input type={"text"} value={SNewPostContent} onChange={(e) => setSNewPostContent(e.target.value)}/>
        <div className={"post-add-button"} onClick={(e) => createNewPost()}>Add</div>
      </div>
    }
    </div>
  </div>
  );
}

export default TodoPage;