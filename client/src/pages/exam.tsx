import React from "react";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
import "./css/exam.css";

interface IAPIResponse { id: string, course: string, date: string }

const ExamPage = (props: {}) => {
  const [ LAPIResponse, setLAPIResponse ] = React.useState<IAPIResponse[]>([]);
  const [ NPostCount, setNPostCount ] = React.useState<number>(1);
  const [ SNewPostCourse, setSNewPostCourse ] = React.useState<string>("");
  const [ SNewPostDate, setSNewPostDate ] = React.useState<string>("");
  const [ SSearchItem, setSSearchItem ] = React.useState<string>("");
  const [ SEditPostId, setSEditPostId ] = React.useState<string | null>(null);
  const [ SEditPostCourse, setSEditPostCourse ] = React.useState<string>("");
  const [ SEditPostDate, setSEditPostDate ] = React.useState<string>("");

  React.useEffect( () => {
    let BComponentExited = false;
    const asyncFun = async () => {
      const { data } = await axios.get<IAPIResponse[]>( SAPIBase + `/exam/getExam?count=${ NPostCount }&search=${ SSearchItem }`);
      console.log(data);
      // const data = [ { id: 0, title: "test1", content: "Example body" }, { id: 1, title: "test2", content: "Example body" }, { id: 2, title: "test3", content: "Example body" } ].slice(0, NPostCount);
      if (BComponentExited) return;
      setLAPIResponse(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
    return () => { BComponentExited = true; }
  }, [ NPostCount, SSearchItem, SEditPostId ]);

  const createNewPost = () => {
    const asyncFun = async () => {
      await axios.post( SAPIBase + '/exam/addExam', { course: SNewPostCourse, date: SNewPostDate } );
      setNPostCount(NPostCount + 1);
      setSNewPostCourse("");
      setSNewPostDate("");
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const deletePost = (id: string) => {
    const asyncFun = async () => {
      // One can set X-HTTP-Method header to DELETE to specify deletion as well
      await axios.post( SAPIBase + '/exam/deleteExam', { id: id } );
      setNPostCount(Math.max(NPostCount - 1, 0));
    }
    asyncFun().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  const editPost = () => {
    const asyncFunc = async () => {
      await axios.post( SAPIBase + '/exam/editExam', { id: SEditPostId, newCourse: SEditPostCourse, newDate: SEditPostDate } );
      setSEditPostId(null);
    }
    asyncFunc().catch(e => window.alert(`AN ERROR OCCURED! ${e}`));
  }

  return (
    <div className="Exam">
      <Header/>
      <h2>Exam</h2>
      <div className={"exam-length-input"}>
        Number of posts to show: &nbsp;&nbsp;
        <input type={"number"} value={ NPostCount } id={"post-count-input"} min={0}
               onChange={ (e) => setNPostCount( parseInt(e.target.value) ) }
        />
      </div>
      <div className={"exam-length-input"}>
        Search Keyword: &nbsp;&nbsp;
        <input type={"text"} value={ SSearchItem } id={"post-search-input"}
               onChange={ (e) => setSSearchItem( e.target.value ) }
        />
      </div>
      <div className={"exam-list"}>
        { LAPIResponse.map( (val, i) =>
          <div key={i} className={"exam-item"}>
            { SEditPostId !== val.id && <div className={"edit-item"} onClick={(e) => { setSEditPostId(val.id); setSEditPostCourse(val.course); setSEditPostDate(val.date); }}>ⓔ</div> }
            {parseInt(val.id as string, 10) !==0 && <div className={"delete-item"} onClick={(e) => deletePost(`${val.id}`)}>ⓧ</div>}
            <h3 className={"exam-course"}>{ val.course }</h3>
            <p className={"exam-body"}>{ val.date }</p>
          </div>
        ) }
        {
          SEditPostId !== null
          ?
            <div className={"exam-item-add"}>
              Course: <input type={"text"} value={SEditPostCourse} onChange={(e) => setSEditPostCourse(e.target.value)}/>
              &nbsp;&nbsp;&nbsp;&nbsp;
              Date: <input type={"text"} value={SEditPostDate} onChange={(e) => setSEditPostDate(e.target.value)}/>
              <div className={"post-add-button"} onClick={(e) => editPost()}>Edit Post!</div>
            </div>
          :
            <div className={"exam-item-add"}>
              Course: <input type={"text"} value={SNewPostCourse} onChange={(e) => setSNewPostCourse(e.target.value)}/>
              &nbsp;&nbsp;&nbsp;&nbsp;
              Date: <input type={"text"} value={SNewPostDate} onChange={(e) => setSNewPostDate(e.target.value)}/>
              <div className={"post-add-button"} onClick={(e) => createNewPost()}>Add Post!</div>
            </div>
        }
      </div>
    </div>
  );
}

export default ExamPage;