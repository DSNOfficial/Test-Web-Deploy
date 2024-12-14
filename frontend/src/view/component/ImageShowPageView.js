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

const smallTextStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '5px',
};

// New post style with blinking effect
const newPostStyle = {
  animation: 'blinker 1.5s linear infinite',
  color: 'white',
  fontSize: '10px',
  backgroundColor: 'red',
  marginLeft: '5px',
  verticalAlign: 'middle',
  padding: '2px 6px',
  borderRadius: '4px',
  fontWeight: 'bold',
};
const KhmerOSSiemReap =  {
  fontFamily: 'KhmerOSSiemReap',
};
const titleStyle = {
  color: "#2566e1",
  fontFamily: 'KhmerOSSiemReap',
  color:"#343293",
};

const buttonStyle = {
  marginTop: '10px',
};

const newsLabelStyle = {
  color: '#34408c',
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const dateTextStyle = {
  fontSize: '12px',

};
const fontKhmer={
  fontFamily: 'KhmerOSSiemReap'
}

// Function to convert Arabic numerals to Khmer numerals
const toKhmerNumeral = (num) => {
  const khmerNumerals = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return num.toString().split('').map(digit => khmerNumerals[digit]).join('');
};

// Function to format date to Khmer format
const formatKhmerDate = (date) => {
  const day = toKhmerNumeral(dayjs(date).date());
  const month = dayjs(date).locale('km').format('MMMM');
  const year = toKhmerNumeral(dayjs(date).year());
  return `ថ្ងៃទី${day} ខែ${month} ${year}`;
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
              <Paragraph style={isHistory ? paragraphStyle : smallParagraphStyle}>
                {isHistory ? item.description : item.Description}
              </Paragraph>
          
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
          {/* <Col xs={24} lg={8}>
            {newsList.length > 0 && (
              <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <div style={newsLabelStyle}>ព័ត៌មានថ្មីៗ</div>
                <Divider />
                {newsList.map((item, index) => renderCard(item, index))}
              </div>
            )}
          </Col> */}
        </Row>
      )}

      {selectedItem && (
      <Modal
      visible={isModalVisible}
      title={
        <span style={{ color: '#343293' }}>
          {selectedItem.title || selectedItem.Name}
        </span>
      }
      footer={null}
      onCancel={handleModalClose}
    >
      <img
        alt={selectedItem.title || selectedItem.Name}
        src={Config.image_path + selectedItem.Image}
        style={imgStyle}
      />
      <Paragraph style={paragraphStyle}>
        {selectedItem.description || selectedItem.Description}
      </Paragraph>
    </Modal>
    
      )}
    </div>
  );
};

export default ImageShowPageView;
