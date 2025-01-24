import React, { useEffect, useState } from "react";
import { message } from "antd";
import { Config } from "../../config/helper";
import { request } from "../../config/request";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

const ImageGeneralNewView = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await request("training/getList", "get");
        if (res && res.list) {
          setList(res.list.slice(0, 4)); // Limit to 4 items
        }
      } catch (error) {
        message.error(`Failed to fetch the list: ${error.message}`);
      }
    };

    getList();
  }, []);

  const isNewPost = (postDate) => {
    const today = dayjs();
    const postDateFormatted = dayjs(postDate);
    const diffInDays = today.diff(postDateFormatted, "day");
    return diffInDays >= 0 && diffInDays <= 2;
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    card: {
      display: "flex",
      alignItems: "flex-start",
      gap: "15px",
      borderRadius: "8px",
      padding: "15px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    image: {
      width: "121px",
      height: "85px",
      objectFit: "cover",
      borderRadius: "4px",
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#333",
      lineHeight: "1.5",
      margin: 0,
      display: "-webkit-box",
      WebkitLineClamp: 4, // Limit to 2 lines
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      color:"#343293"
    },
    newLabel: {
      display: "inline-block",
      backgroundColor: "#ff9800",
      color: "#fff",
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      marginLeft: "10px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      {list.map((item, index) => (
        <div key={index} style={styles.card}>
          <NavLink to={`/page/trainers/${item.id}`}>
            <img
              style={styles.image}
              src={item.Image ? `${Config.image_path}${item.Image}` : "/placeholder.png"}
              alt={item.title || "News"}
            />
          </NavLink>
          <div style={styles.textContainer}>
            <NavLink to={`/page/trainers/${item.id}`}>
              <p style={styles.title}>
                {isNewPost(item.createdAt) && <span style={styles.newLabel}>ថ្មី</span>}
                {item.title || "Untitled"}
              </p>
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGeneralNewView;
