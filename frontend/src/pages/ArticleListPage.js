import { useState, useEffect } from 'react';
import ArticlesList from '../components/ArticlesList';
// import articles from './article-content';
import AddBlog from '../components/AddBlog';
import axios from 'axios';


const ArticlesListPage = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [local, setLocal] = useState(false);
    const [btn, setBtn] = useState("Add Blog");
    const [articles,setArticles] = useState([]);

    useEffect(()=>{
        setLocal((val) => val = (localStorage.getItem("userInfo")? false : true));
    },[localStorage])
    
    const blogFetch = async ()=>{
        const userData = localStorage.getItem("userInfo");
        const obj = JSON.parse(userData);
        const _id = obj._id;
        console.log(_id);

        try{
            const config = {
                headers: {
                    "Content-type" : "application/json"
                },
            };

            const {data} = await axios.post(
                "/blog/fetchBlog",
                {
                    userid:_id,
                },
                config
            );

            setArticles(data);
            console.log(data);
        }catch(error){
            console.log(error.response.data.message);
        }
    }

    useEffect(()=>{
        blogFetch();
    },[articles])

    return (
        <>
            <h1 style={{textAlign: 'center'}}>Articles</h1>
            <ArticlesList articles={articles} setAlert={props.setAlert} blogFetch={blogFetch}/>
       
            <button disabled = {local} type="button" style={{margin: '10px',padding: '10px'}} onClick={()=>{
                console.log("add blog clicked");
                setShowForm(!showForm);
                setBtn((data)=> data = (data === "Add Blog")?"Scroll down":"Add Blog");
            }}>{btn}</button>
            {showForm && <AddBlog setShowForm={setShowForm} blogFetch={blogFetch} setAlert={props.setAlert}/>}
        </>
    );
}

export default ArticlesListPage;