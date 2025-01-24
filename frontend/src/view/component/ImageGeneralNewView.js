
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { Config } from "../../config/helper";
import { request } from "../../config/request";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

const ImageGeneralNewView = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const res = await request("training/getList", "get");
      if (res && res.list) {
        setList(res.list.slice(0, 3)); // Limit to 3 items
      }
    } catch (error) {
      message.error("Failed to fetch the list");
    }
  };

  // Function to check if the post is new (posted within the last week)
  const isNewPost = (postDate) => {
    const today = dayjs();
    const postDateFormatted = dayjs(postDate);
    const diffInDays = today.diff(postDateFormatted, "day"); // Difference in days
    return diffInDays >= 0 && diffInDays <= 2; // Check if within the last 7 days
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "1px",
  };

  const cardStyle = {
    marginLeft: "-17px",
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#fff",
  };

  const imageStyle = {
    width: "121px",
    height: "85px",
    objectFit: "cover",
    borderRadius: "4px",
  };

  const textContainerStyle = {
    flex: 1,
  };

  const titleStyle = {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#333",
    lineHeight: "1.5",
    margin: 0,
  };

  const newLabelStyle = {
    display: "inline-block",
    backgroundColor: "#ff9800",
    color: "#fff",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    marginLeft: "10px",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      {list.map((item, index) => (
        <div key={index} style={cardStyle}>
          <img
            style={imageStyle}
            src={Config.image_path + item.Image}
            alt={item.title || "News"}
          />
          <div style={textContainerStyle}>
            <NavLink to={`/page/trainers/${item.id}`}>
              <p style={titleStyle}>
                {item.title}{" "}
                {isNewPost(item.date) && <span style={newLabelStyle}>ថ្មី</span>}
              </p>
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGeneralNewView;
