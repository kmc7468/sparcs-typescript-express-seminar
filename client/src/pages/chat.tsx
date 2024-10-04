import React from "react";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import Header from "../components/header";
import "./css/feed.css";

interface IAPIResponse {
  id: string;
  title: string;
  content: string;
}

const ChatPage = (props: {}) => {
  const [LAPIResponse, setLAPIResponse] = React.useState<IAPIResponse[]>([]);
  const [NPostCount, setNPostCount] = React.useState<number>(0);
  const [SNewPostTitle, setSNewPostTitle] = React.useState<string>("");
  const [SSearchItem, setSSearchItem] = React.useState<string>("");
  const [SEditPostId, setSEditPostId] = React.useState<string | null>(null);
  const [SEditPostTitle, setSEditPostTitle] = React.useState<string>("");

  React.useEffect(() => {
    let BComponentExited = false;
    const asyncFun = async () => {
      const { data } = await axios.get<IAPIResponse[]>(
        SAPIBase + `/chat/getChat?count=${NPostCount}&search=${SSearchItem}`
      );
      console.log(data);
      // const data = [ { id: 0, title: "test1", content: "Example body" }, { id: 1, title: "test2", content: "Example body" }, { id: 2, title: "test3", content: "Example body" } ].slice(0, NPostCount);
      if (BComponentExited) return;
      setLAPIResponse(data);
    };
    asyncFun().catch((e) => window.alert(`Error while running API Call: ${e}`));
    return () => {
      BComponentExited = true;
    };
  }, [NPostCount, SSearchItem, SEditPostId]);

  React.useEffect(() => {
    axios
      .get<number>(SAPIBase + "/chat/getChatLength")
      .then((res) => setNPostCount(res.data));
  }, []);

  const createNewPost = () => {
    const asyncFun = async () => {
      await axios.post(SAPIBase + "/chat/addChat", {
        title: SNewPostTitle,
      });
      setNPostCount(NPostCount + 1);
      setSNewPostTitle("");
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const deletePost = (id: string) => {
    const asyncFun = async () => {
      // One can set X-HTTP-Method header to DELETE to specify deletion as well
      await axios.post(SAPIBase + "/chat/deleteChat", { id: id });
      setNPostCount(Math.max(NPostCount - 1, 0));
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const editPost = () => {
    const asyncFunc = async () => {
      await axios.post(SAPIBase + "/chat/editChat", {
        id: SEditPostId,
        newTitle: SEditPostTitle,
      });
      setSEditPostId(null);
    };
    asyncFunc().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  return (
    <div className="Feed">
      <Header />
      <h2>Chat</h2>
      <div className={"feed-length-input"}>
        Number of posts to show: &nbsp;&nbsp;
        <input
          type={"number"}
          value={NPostCount}
          id={"post-count-input"}
          min={0}
          onChange={(e) => setNPostCount(parseInt(e.target.value))}
        />
      </div>
      <div className={"feed-length-input"}>
        Search Keyword: &nbsp;&nbsp;
        <input
          type={"text"}
          value={SSearchItem}
          id={"post-search-input"}
          onChange={(e) => setSSearchItem(e.target.value)}
        />
      </div>
      <div className={"feed-list"}>
        {LAPIResponse.map((val, i) => (
          <div key={i} className={"feed-item"}>
            {SEditPostId !== val.id && (
              <div
                className={"edit-item"}
                onClick={(e) => {
                  setSEditPostId(val.id.toString());
                }}
              >
                ⓔ
              </div>
            )}
            <div
              className={"delete-item"}
              onClick={(e) => deletePost(`${val.id}`)}
            >
              ⓧ
            </div>
            <h3 className={"feed-title"}>{val.title}</h3>
            <p className={"feed-body"}>{val.content}</p>
          </div>
        ))}
        {SEditPostId !== null ? (
          <div className={"feed-item-add"}>
            Title:{" "}
            <input
              type={"text"}
              value={SEditPostTitle}
              onChange={(e) => setSEditPostTitle(e.target.value)}
            />
            <div className={"post-add-button"} onClick={(e) => editPost()}>
              Edit Post!
            </div>
          </div>
        ) : (
          <div className={"feed-item-add"}>
            Title:{" "}
            <input
              type={"text"}
              value={SNewPostTitle}
              onChange={(e) => setSNewPostTitle(e.target.value)}
            />
            <div className={"post-add-button"} onClick={(e) => createNewPost()}>
              Add Post!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
