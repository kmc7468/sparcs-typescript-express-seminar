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
  const [ SEditPostId, setSEditPostId ] = React.useState<string | null>(null);
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

  return (
    <div></div>
  );
}

export default TodoPage;