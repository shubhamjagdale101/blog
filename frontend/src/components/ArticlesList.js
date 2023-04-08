import { Link } from 'react-router-dom';
import './ArticleList.css';
import { useState, useEffect } from 'react';
import axios from 'axios'

const ArticlesList = (props) => {


    const deleteBlog = async (_id)=>{
        try{
            props.setAlert({msg:"blog deleting...",type:"delete",vis:true});
            const config = {
                headers: {
                    "Content-type" : "application/json"
                },
            };

            const {data} = await axios.post(
                "/blog/delete",
                {
                    id:_id,
                },
                config
            );

            console.log(data);
            props.setAlert({msg:"deleted sucessfully",type:"success",vis:true});
            props.blogFetch();
        }catch(error){
            props.setAlert({msg:error.response.data.message,type:"delete",vis:true});
            console.log(error.response.data.message);
        }
        setTimeout(()=>{
            props.setAlert({msg:null,type:null,vis:false});
        },800);
    }

    return (
        <>
        <div>
            {props.articles.map((article)=>(
                <div className="art" key={article._id}>
                    <Link key={article._id} className="blogDisplay" to={`/articles/${article._id}`}>
                        <div>{article.subject}</div>
                        <p>{article.content.substring(0,150)}...</p>
                    </Link>
                    <button className="softBtn" style={{float: 'right'}} onClick={()=>deleteBlog(article._id)}>delete</button>
                </div>
            ))}
        </div>
        </>
    );
}

export default ArticlesList;

// {articles.map((article) => (
//     <div className="art">
        // <Link key={article._id} className="article-list-item" to={`/articles/${article._id}`}>
        //     <h3>{article.subject}</h3>
        //     <p>{article.content.substring(0, 150)}...</p>
        // </Link> 
//         <button>delete</button>  
//     </div>
// ))}