import React, { useState, useEffect } from "react";
import BlogDetailComponent from "../components/BlogDetailComponent";
import RelatedPostsComponent from "../components/RelatedPostsComponent";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";

const BlogsDetails = () => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/api/user/findPost?id=${title}`);
      const relatedRes = await axios.get(`/api/user/relatedPost?id=${title}`);
      setPost(response.data);
      setRelatedPosts(relatedRes.data);
    };
    fetch();
  }, [title]);

  return (
    <>
      {post && <BlogDetailComponent post={post} />}
      {relatedPosts.length > 0 && <RelatedPostsComponent posts={relatedPosts} />}
    </>
  );
};

export default BlogsDetails;
