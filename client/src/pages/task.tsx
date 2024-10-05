
import React from "react";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
import "./css/feed.css";

interface IAPIResponse { id: string, title: string, check: string }

const TaskPage = (props: {}) => {
  const [ LAPIResponse, setLAPIResponse ] = React.useState<IAPIResponse[]>([]);
  const [ NPostCount, setNPostCount ] = React.useState<number>(0);
  const [ SNewPostTitle, setSNewPostTitle ] = React.useState<string>("");
  const [ SNewPostcheck, setSNewPostcheck ] = React.useState<string>("x"); // 초기값을 "x"로 설정
  const [ SSearchItem, setSSearchItem ] = React.useState<string>("");
  const [ SEditPostId, setSEditPostId ] = React.useState<string | null>(null);
  const [ SEditPostTitle, setSEditPostTitle ] = React.useState<string>("");
  const [ SEditPostcheck, setSEditPostcheck ] = React.useState<string>("x"); // 초기값을 "x"로 설정

  React.useEffect( () => {
    let BComponentExited = false;
    const asyncFun = async () => {
      const { data } = await axios.get<IAPIResponse[]>( SAPIBase + `/task/gettask?count=${ NPostCount }&search=${ SSearchItem }`);
      console.log(data);
      // 데이터 예시 수정 (check 값을 "o" 또는 "x"로 설정)
      // const data = [ { id: 0, title: "test1", check: "o" }, { id: 1, title: "test2", check: "x" }, { id: 2, title: "test3", check: "o" } ].slice(0, NPostCount);
      if (BComponentExited) return;
      setLAPIResponse(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
    return () => { BComponentExited = true; }
  }, [ NPostCount, SSearchItem, SEditPostId ]);

  const createNewPost = () => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/task/addtask', { title: SNewPostTitle, check: SNewPostcheck } );
      setNPostCount(NPostCount + 1);
      setSNewPostTitle("");
      setSNewPostcheck("x"); // 새로운 포스트 추가 후 체크 상태 초기화
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const deletePost = (id: string) => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/task/deletetask', { id: id } );
      setNPostCount(Math.max(NPostCount - 1, 0));
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const editPost = () => {
    const asyncFunc = async () => {
      await axios.post( SAPIBase + '/task/edittask', { id: SEditPostId, newTitle: SEditPostTitle, newcheck: SEditPostcheck } );
      setSEditPostId(null);
    }
    asyncFunc().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  return (
    <div className="Feed">
      <Header/>
      <h2>To do list</h2>
      <div className={"feed-length-input"}>
        Number of posts to show: &nbsp;&nbsp;
        <input type={"number"} value={ NPostCount } id={"post-count-input"} min={0}
               onChange={ (e) => setNPostCount( parseInt(e.target.value) ) }
        />
      </div>
      <div className={"feed-length-input"}>
        Search Keyword: &nbsp;&nbsp;
        <input type={"text"} value={ SSearchItem } id={"post-search-input"}
               onChange={ (e) => setSSearchItem( e.target.value ) }
        />
      </div>
      <div className={"feed-list"}>
        { LAPIResponse.map( (val, i) =>
          <div key={i} className={"feed-item"}>
            { SEditPostId !== val.id && 
              <div className={"edit-item"} onClick={(e) => { 
                setSEditPostId(val.id); 
                setSEditPostTitle(val.title); 
                setSEditPostcheck(val.check); // 편집 시 기존 체크 상태 설정
              }}>ⓔ</div> 
            }
            <div className={"delete-item"} onClick={(e) => deletePost(`${val.id}`)}>ⓧ</div>
            <h3 className={"feed-title"}>{ val.title }</h3>
            <p className={"feed-body"}>{ val.check }</p>
          </div>
        ) }
        {
          SEditPostId !== null
          ?
            <div className={"feed-item-add"}>
              Title: <input type={"text"} value={SEditPostTitle} onChange={(e) => setSEditPostTitle(e.target.value)}/>
              &nbsp;&nbsp;&nbsp;&nbsp;
              check: <input 
                type={"checkbox"} 
                checked={SEditPostcheck === "o"} // 체크 상태를 "o"에 따라 설정
                onChange={(e) => setSEditPostcheck(e.target.checked ? "o" : "x")} // 체크 여부에 따라 상태 변경
              />
              <div className={"post-add-button"} onClick={(e) => editPost()}>Edit Post!</div>
            </div>
          :
            <div className={"feed-item-add"}>
              Title: <input type={"text"} value={SNewPostTitle} onChange={(e) => setSNewPostTitle(e.target.value)}/>
              &nbsp;&nbsp;&nbsp;&nbsp;
              check: <input 
                type={"checkbox"} 
                checked={SNewPostcheck === "o"} // 체크 상태를 "o"에 따라 설정
                onChange={(e) => setSNewPostcheck(e.target.checked ? "o" : "x")} // 체크 여부에 따라 상태 변경
              />
              <div className={"post-add-button"} onClick={(e) => createNewPost()}>Add Post!</div>
            </div>
        }
      </div>
    </div>
  );
}

export default TaskPage;
