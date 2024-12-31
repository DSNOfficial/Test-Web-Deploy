import { useNavigate, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/km'; // Import the custom locale
import { Config } from "../../config/helper";
import { request } from "../../config/request";
import { Card, Typography, Row, Col, message, Divider, Button, Spin, Modal } from 'antd';

const { Paragraph, Title } = Typography;

const cardStyle = {
  width: "100%",
  marginBottom: "20px",
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginTop: "-1%",
};

const noBorderCardStyle = {
  ...cardStyle,
  border: 'none',
  boxShadow: 'none',
};

const imgStyle = {
  display: 'block',
  width: "100%",
  borderRadius: '8px',
};

const smallImgStyle = {
  ...imgStyle,
  maxWidth: '70%',
  margin: '0 auto',
  marginBottom: '8px',
  fontFamily: 'KhmerOSSiemReap',
  color:"#343293",
};

const paragraphStyle = {
  textAlign: "justify",
  textJustify: "inter-word",
  padding: '8px',
  fontFamily: 'KhmerOSSiemReap',
  color:"#343293",
};

const smallParagraphStyle = {
  ...paragraphStyle,
  fontSize: '14px',
  color:"#343293",
};

const titleStyle = {
  color: "#2566e1",
  fontFamily: 'KhmerOSSiemReap',
  color:"#343293",
};

const buttonStyle = {
  marginTop: '10px',
};

// Read More Toggle Component
const ReadMoreParagraph = ({ description, isHistory }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <Paragraph
        style={isHistory ? paragraphStyle : smallParagraphStyle}
        ellipsis={!isExpanded} // Apply ellipsis when text is truncated
      >
        {description}
      </Paragraph>
      
      <div style={{ textAlign: "right", marginTop: 5 }}>
        <Button
          onClick={handleToggle}
          type="link"
          style={{ padding: 0 }}
        >
          {isExpanded ? "បង្ហាញ" : "អានបន្ថែម"}
        </Button>
      </div>
    </div>
  );
};

const ImageShowPageView = () => {
  const [historyList, setHistoryList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getHistoryList();
    getNewsList();
  }, []);

  const getHistoryList = async () => {
    setLoading(true);
    try {
      const res = await request("history/getList", "get");
      if (res && res.list && res.list.length > 0) {
        setHistoryList(res.list.slice(-1));
      }
    } catch (error) {
      message.error("Failed to fetch the history list");
    } finally {
      setLoading(false);
    }
  };

  const getNewsList = async () => {
    setLoading(true);
    try {
      const res = await request("department/getList", "get");
      if (res && res.list && res.list.length > 0) {
        setNewsList(res.list.slice(0, 3));
      }
    } catch (error) {
      message.error("Failed to fetch the news list");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const renderCard = (item, index, isHistory = false) => {
    const isNewPost = dayjs().diff(dayjs(item.CreateAt), 'week') < 1;
  
    return (
      <Card
        hoverable={isHistory}
        style={isHistory ? cardStyle : noBorderCardStyle}
        bodyStyle={{ padding: 0, overflow: 'hidden' }}
        key={index}
        onClick={isHistory ? () => handleCardClick(item) : undefined}
        className='KhmerOSSiemReap'
      >
        <Row gutter={15} align="middle">
          <Col xs={24} md={isHistory ? 24 : 8}>
            <img
              alt={item.title || item.Name}
              src={Config.image_path + item.Image}
              style={isHistory ? imgStyle : smallImgStyle}
            />
          </Col>
          <Col  xs={24} md={isHistory ? 24 : 16}>
            <div style={isHistory ? { padding: '16px' } : paragraphStyle}>
              <Title level={isHistory ? 3 : 5} style={titleStyle}>
                {isHistory ? `“ ${item.title} ”` : item.Name}
              </Title>
              {/* Use the ReadMoreParagraph component here */}
              <ReadMoreParagraph 
                description={isHistory ? item.description : item.Description} 
                isHistory={isHistory}
              />
            </div>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={15}>
          <Col xs={24} lg={24} style={titleStyle}>
            {historyList.map((item, index) => renderCard(item, index, true))}
          </Col>
        </Row>
      )}

  
    </div>
  );
};

export default ImageShowPageView;
