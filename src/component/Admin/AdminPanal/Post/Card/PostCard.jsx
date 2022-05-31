import { Button, Card, Menu } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { LikeOutlined, CommentOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { Modal } from 'antd';


import { Dropdown, message, Tooltip, Table } from "antd";
import { AppstoreAddOutlined, UserOutlined } from "@ant-design/icons";
import EditComment from "./EditComment";

const PostCard = ({ postInfo }) => {
  const [values, setValues] = useState({
    content: "",
    index: "",
  });

  const [editValues, setEditValues] = useState({
    content: "",
    index: "",
  });

  const [data, NewData] = useState({
    content: "",
  });

  const [comment, setCommnet] = useState(false)
  const [dataSource, setDataSource] = useState([]);
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState(false)
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("kdhfjf");
  const userId = localStorage.userId


  const refContainer = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (refContainer.current) {
      setDimensions({
        width: refContainer.current.offsetWidth,
        height: refContainer.current.offsetHeight,
      });
    }
  }, []);
  const [cls, setCls] = useState({ color: "green" });

  useEffect(() => {
    axios
      .get(
        `https://soapp-nodejs.herokuapp.com/post/view-comment/${postInfo.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-info")}`,
          },
        }
      )
      .then((res) => {
        setDataSource(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const edithandleChange = (event) => { 
    event.preventDefault()
    setEditValues({
      ...editValues,
      [event.target.name]: event.target.value,
    });
  };

  function handleButtonClick(e) {
    message.info("Click on left button.");
  }

  function handleMenuClick(e) {
    message.info("Click on menu item.");
  }

  const handleFromSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    axios
      .post(`https://soapp-nodejs.herokuapp.com/post/create-post`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));

    // navigate("/login")
  };

  const postComment = (postInfo, id, content) => {
    const body = {
      post_id: id,
      content: values.content,
    };
    console.log(body);
    axios
      .post(`https://soapp-nodejs.herokuapp.com/post/create-comment`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
    console.log(postInfo);
    console.log(values);
  };

  const Editpost = (postInfo, id, content) => {
    const body = {
      post_id: id,
      content: editValues.content,
    };
    console.log("editpost info",postInfo);
    console.log("xczxcxc", editValues);
    axios
      .patch(`https://soapp-nodejs.herokuapp.com/post/update-post/${postInfo.id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
    console.log(postInfo);
    console.log(editValues);
  };

  const Like_Change = () => {
    cls.color === "green"
      ? setCls({ color: "red" })
      : setCls({ color: "green" });
  };


  

  const showModal = () => {
  setVisible(true);
};


const editPostModel = () =>{
  
<form className="from-wrapper">
          <div className="email">
            <div className="name">
              <label className="label">Comment</label>
              <input
                className="input"
                type="text"
                name="content"
                value={editValues.content}
                onChange={edithandleChange}
              />
            </div>
          </div>
          <Button
            type="primary"
            shape="round"
            icon={<EditOutlined />}
            size="large"
            onClick={() => Editpost(postInfo, postInfo.id, postInfo.content)}
          >
            Edit Comment
          </Button>
        </form>
}

const handleOk = () => {
  setModalText(<form className="from-wrapper">
            <div className="email">
              <div className="name">
                <label className="label">Update Commnet </label>
                <input
                  className="input"
                  type="text"
                  name="content"
                  value={editValues.content}
                  onChange={edithandleChange}
                />
              </div>
            </div>
            <Button
              type="primary"
              shape="round"
              icon={<EditOutlined />}
              size="large"
              onClick={() => Editpost(postInfo, postInfo.id, postInfo.content)}
            >
              Edit Comment
            </Button>
          </form>);
  setConfirmLoading(true);
  setTimeout(() => {
    setVisible(false);
    setConfirmLoading(false);
  }, 2000);
};

const handleCancel = () => {
  console.log('Clicked cancel button');
  setVisible(false);
};


const deletePost = (id) => {
  const body = {
    content: data.content,
  };
  axios
    .post(
      `https://soapp-nodejs.herokuapp.com/post/delete-post/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      }
    )
    .then((res) => console.log("ggggg1", res.data))
    .catch((e) => console.log(e));

};






  const Like_Count = (id) => {
    const body = {
      post_id: id,
    };
    console.log(body);
    axios
      .post(`https://soapp-nodejs.herokuapp.com/post/like-unlike`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };


  const menu = (
   
    <Menu>
      <Menu.Item key="0">
        

      <Button type="primary" onClick={showModal}>
        Update Comment
      </Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{<form className="from-wrapper">
          <div className="email">
            <div className="name">
              <label className="label">Comment</label>
              <input
                className="input"
                type="text"
                name="content"
                value={editValues.content}
                onChange={edithandleChange}
              />
            </div>
          </div>
          <Button
            type="primary"
            shape="round"
            icon={<EditOutlined />}
            size="large"
            onClick={() => Editpost(postInfo, postInfo.id, postInfo.content)}
          >
            Edit Comment
          </Button>
        </form>}</p>
      </Modal>

      </Menu.Item>
      <Menu.Item key="1">{(userId == postInfo.user_id) && 
              (
               
                  
                <Tooltip placement="topLeft" title="Follow this user">
                  <Button
                    type="primary"
                    shape="round"
                    onClick={()=> deletePost(postInfo.id)}
                  >
                    Delete
                  </Button>
                </Tooltip>
              )
  
              }</Menu.Item>
      <Menu.Item key="1">Menu Item Three</Menu.Item>
    </Menu>
  );

  return (
    <Card
      title={postInfo.first_name + " "+ postInfo.last_name}
      extra={
        
          <Dropdown.Button
            overlay={menu}
            placement="bottom"
            icon={<AppstoreAddOutlined />}
            className="ant-card-head"
          >
            More
          </Dropdown.Button>
        
      }
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#fafafa",
        margin: "20px",
      }}
      ref={refContainer}
    >
      <div className="Data_Show" key={postInfo.id}>
        <h4 className=""> {postInfo.content}</h4>
        <h4 className=""><img src={postInfo.picture} alt={postInfo.first_name}/></h4>

        <div>
          <style>{`
        .red {color: red}
        .green {color: green} 
      `}</style>
          <Button
            type="primary"
            shape="round"
            icon={<LikeOutlined />}
            size="large"
            style={cls}
            // className={cls}
            onClick={() => {
              Like_Change();
              Like_Count(postInfo.id);
            }}
            // {() => cls.color === 'green' ? setCls({color: 'red'}) : setCls({color: 'green'}) like() }
          >
            Like
          </Button>

          <form className='from-wrapper'>

               <div className='email'>
                    <div className='name'>
                    <label className='label'>Comment</label>
                    <input className='input' type="text" name='content' value={values.content} onChange={handleChange}/>
                     </div>
                </div>

          <Button
            type="primary"
            shape="round"
            icon={<CommentOutlined />}
            size="large"
            onClick={() => postComment(postInfo, postInfo.id, postInfo.content)}
          >
            Comment
          </Button>

          </form>
        </div>
      </div>
      <div>
       
        {/* {dataSource.length > 0 ? 
            <EditComment editInfo={dataSource} />
         : 
          <h1>Data not found</h1>
        } */}
        <EditComment editInfo={dataSource} />

      </div>
    </Card>
  );
};

export default PostCard;


// <form className="from-wrapper">
//           <div className="email">
//             <div className="name">
//               <label className="label">Comment</label>
//               <input
//                 className="input"
//                 type="text"
//                 name="content"
//                 value={editValues.content}
//                 onChange={edithandleChange}
//               />
//             </div>
//           </div>
//           <Button
//             type="primary"
//             shape="round"
//             icon={<EditOutlined />}
//             size="large"
//             onClick={() => Editpost(postInfo, postInfo.id, postInfo.content)}
//           >
//             Edit Comment
//           </Button>
//         </form>