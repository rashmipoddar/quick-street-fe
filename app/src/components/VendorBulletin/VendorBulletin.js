import React, { useState, useEffect } from "react";
import VendorAddPostForm from "./VendorAddPostForm";
import VendorPostList from "./VendorPostList";
import axios from "axios";

const VendorBulletin = props => {
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({
    content: "",
    zipcode: ""
  });

  const addPost = e => {
    e.preventDefault();
    setShowAddPostForm(true);
  };

  const cancelAddPost = e => {
    e.preventDefault();
    setShowAddPostForm(false);
  };

  const postSubmit = e => {
    e.preventDefault();
    axios
      .post(
        `https://quickstlabs.herokuapp.com/api/v1.0/vendors/5dfc1ea2396390001715f1e3/posts`,
        { title: "test title", description: post.content }
      )
      .then(res => setPosts([...posts, res.data.data]));

    setPost({ post: "", content: "" });
  };

  useEffect(() => {
    axios
      .get(
        `https://quickstlabs.herokuapp.com/api/v1.0/vendors/5dfc1ea2396390001715f1e3/posts`
      )
      .then(res => {
        console.log(res.data.data);
        setPosts(res.data.data);
      });
  }, []);

  return (
    <div className="vendor_bulletin_container">
      <div className="vendor_bulletin_title">
        <p>Bulletin Board</p>
        <hr />
      </div>

      <div className="vendor_add_post_btn_wrapper">
        <button onClick={addPost}>Add Post</button>
      </div>

      <VendorAddPostForm
        show={showAddPostForm}
        cancelAddPost={cancelAddPost}
        post={post}
        setPost={setPost}
        postSubmit={postSubmit}
      />

      <VendorPostList posts={posts} />
    </div>
  );
};

export default VendorBulletin;