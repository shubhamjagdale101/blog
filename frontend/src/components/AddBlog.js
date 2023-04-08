import React, { useState } from 'react'
import axios from 'axios'

const AddBlog = (props) => {
    const [subject, setSubject] = useState();
    const [content, setContent] = useState();

    const blogInsert = async (event)=>{
        event.preventDefault();
        const userData = localStorage.getItem("userInfo");
        const obj = JSON.parse(userData);
        const _id = obj._id;

        try{
            props.setAlert({msg:"blog inserting...",type:"process",vis:true});
            const config = {
                headers: {
                    "Content-type" : "application/json"
                },
            };

            const {data} = await axios.post(
                "/blog/insert",
                {
                    userid:_id,
                    subject,
                    content,
                },
                config
            );
            props.setAlert({msg:"blog inserted successfully",type:"success",vis:true});
            props.blogFetch();
        }catch(error){
            props.setAlert({msg:error.response.data.message,type:"delete",vis:true});
            console.log(error.response.data.message);
        }
        setTimeout(()=>{
            props.setAlert({msg:null,type:null,vis:false});
        },800)
        props.setShowForm((val)=> val = !val);
    }

  return (
    <form style={{margin:"10px", padding:"10px"}}>
        <br/><br/>
        <label htmlFor="subject">Subject:</label><br/>
        <input type="text" id="subject" name="subject" onChange={(event)=>{
            setSubject((data)=>data = event.target.value);
        }}/>
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" style={{width:"100%"}} onChange={(event)=>{
            setContent((data)=> data = event.target.value);
        }}></textarea>
        <button onClick={blogInsert}>upload</button>
    </form>
  )
}

export default AddBlog;
