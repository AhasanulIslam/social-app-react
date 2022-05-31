import { Collapse } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navber from "../../Navber";
import Validation from "../../SignUp/Validation";
import PostCard from "./Post/Card/PostCard";
import { 
  Select
} from 'antd';

const { Panel } = Collapse;

const Home = () => {
  const [values, setValues] = useState({
    content: "",
    index: "",
  });

  const [values1, setValues1] = useState("")

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState({})

  console.log("gg", values);


 

  useEffect(() => {
    console.log("lsdkflsdk");
    axios
      .get("https://soapp-nodejs.herokuapp.com/post/view-post", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-info")}`,
        },
      })
      .then((res) => {
        console.log("view post", res.data.data);
        setUserData(res.data.data);
        // console.log(
        //   "quiz",
        //   res.data.map((res) => {
        //     console.log(res.data)
        //   })
        // );
        // setUserData(res.data.quiz);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  
  console.log("image response",response);
  const { Option } = Select;


  const [errors, setErrors] = useState({});

  const [dataIsCorrect, setDataIsCorrect] = useState(false)

  const handleChange = (event) => {
      setValues1(
           event.target.value
      )
  }




  const postHandleFromSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values1))
    setDataIsCorrect(true)
    console.log(values1);
    axios.post(`https://soapp-nodejs.herokuapp.com/post/create-post`,
{
  content: values1,
  imageUrl: response.url
},
 {
  headers: {

    Authorization: `Bearer ${localStorage.getItem("user-info")}`,
  },
})
    .then(res => console.log(res.data))
    .catch(e => console.log(e))

    // navigate("/login")


}



  const handleFromSubmit = async e => {
    console.log(e.target.files[0])
    // console.log(image)
    const data = new FormData()
    data.append('file', e.target.files[0]) 
    // data.append("fileName", image.name)

    data.append('upload_preset','ahasan_images')
    setLoading(true)

      e.preventDefault();
      setErrors(Validation(values1))
      setDataIsCorrect(true)
      console.log(values1);

      return await axios
    .post("https://api.cloudinary.com/v1_1/v2-tech/image/upload", data)
    .then((res) => {
      setResponse(res.data)
      // axios.post(`https://soapp-nodejs.herokuapp.com/post/create-post`,
      //   values1,
      //   {
      //    headers: {
   
      //      Authorization: `Bearer ${localStorage.getItem("user-info")}`,
      //    },
      //  }) 
      //      .then(res => console.log(res.data)
      //      )
      //      .catch(e => console.log(e))
  
      //   console.log(res)
    })
    .catch((error) => {
        console.log(error)

    });
  }

  //     axios.post(`https://soapp-nodejs.herokuapp.com/post/create-post`,
  //  values1,
  //  {
  //   headers: {

  //     Authorization: `Bearer ${localStorage.getItem("user-info")}`,
  //   },
  // })
  //     .then(res => console.log(res.data))
  //     .catch(e => console.log(e))

  //     // navigate("/login")


  // }

  useEffect(() => {
      if(Object.keys(errors).length === 0 && dataIsCorrect){
          // submitForm(true)
      }
  }, [errors])

  const uploadImage = async e =>{
    console.log(e.target.files[0])
    // console.log(image)
    const data = new FormData()
    data.append('file', e.target.files[0]) 
    // data.append("fileName", image.name)

    data.append('upload_preset','ahasan_images')
    setLoading(true)


    return await axios
    .post("https://api.cloudinary.com/v1_1/v2-tech/image/upload", data)
    .then((res) => {
      axios.post(`https://soapp-nodejs.herokuapp.com/post/create-post`,
        {
          imageUrl: res.data.url
        },
        {
         headers: {
   
           Authorization: `Bearer ${localStorage.getItem("user-info")}`,
         },
       }) 
           .then(res => console.log(res.data)
           )
           .catch(e => console.log(e))
  
        console.log(res)
    })
    .catch((error) => {
        console.log(error)

    });
  }

  return (
    <div className="full_div" style={{ marginTop: 16 }}>
      <Navber />
      <span>Use Content or Image</span>

      <form className="home_post">
        <div className="email">
          <div className="name">
            <label className="label">Post</label>
            <input
              className="input"
              type="text"
              name="content"
              value={values1}
              onChange={handleChange}
            />

            <input
              type="file"
              name="file"
              value={values1.imageUrl}
              placeholder="Upload an image"
              onChange={handleFromSubmit}
            />

            {errors.content && <p className="error">{errors.content}</p>}
          </div>
        </div>
        <div>
          <button className="submit" onClick={postHandleFromSubmit}>
            Post
          </button>
        </div>
      </form>

      {userData && userData.length > 0 ? (
        userData.map((el, index) => (
          // <h1>{el.quiz_name}</h1>
          <PostCard postInfo={el} key={index} />
        ))
      ) : (
        <h1>Data not found</h1>
      )}
    </div>
  );
};

export default Home;
