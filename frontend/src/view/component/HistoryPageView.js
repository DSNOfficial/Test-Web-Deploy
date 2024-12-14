import React, { useEffect, useState } from "react";
import { Config } from "../../config/helper";
import { request } from "../../config/request";
import { Card, Typography, Divider, Row, Col, message, Spin } from 'antd';

const containerStyle = {
  padding: '20px',
  margin: '0 auto',
  maxWidth: '1200px',
  backgroundColor: 'white',
  marginTop: '-25px',
};

const cardStyle = {
  width: "100%",
  marginBottom: '20px',
  borderRadius: '8px',
  overflow: 'hidden',
};

const imgStyle = {
  width: "100%",
  height: 'auto',
};

const textContainerStyle = {
  padding: '20px',
  fontFamily: 'KhmerOSSiemReap',

};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  fontFamily: 'KhmerOSSiemReap',
  color:'#343293'
};

const paragraphStyle = {
  textAlign: 'justify',
  textJustify: 'inter-word',
  fontFamily: 'KhmerOSSiemReap',
  color:'#343293'

};

const { Paragraph, Title } = Typography;

const HistoryPageView = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    try {
      const res = await request("history/getList", "get");
      if (res && res.list && res.list.length > 0) {
        const lastItem = res.list[res.list.length - 1];
        setList([lastItem]);
      }
    } catch (error) {
      message.error("Failed to fetch the list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        list.map((item, index) => (
          <div key={index}>
            <Title level={2} style={titleStyle}>{item.title}</Title>
            <Card hoverable style={cardStyle}>
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={12}>
                  <img
                    alt={item.title}
                    src={Config.image_path + item.Image}
                    style={imgStyle}
                  />
                </Col>
                <Col xs={24} md={12}>
                  <div style={textContainerStyle}>
                    <Paragraph style={paragraphStyle}>
                      {item.description}
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            </Card>
            <Divider />
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryPageView;
