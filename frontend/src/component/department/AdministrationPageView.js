import React, { useEffect, useState, useRef } from "react";
import { Config } from "../../config/helper";
import { request } from "../../config/request";
import { Card, Typography, Divider, Row, Col, message, Pagination } from 'antd';
import dayjs from 'dayjs';
const containerStyle = {
    padding: '20px',
    margin: '0 auto',
    maxWidth: '1200px',
    backgroundColor: 'white',
    marginTop: '-25px',
    color: '#343293',
    backgroundColor: '#f5f5f5',
    padding: '20px'
};

const AdministrationPageView = () => {
    const [list, setList] = useState([]);
    const [departmentNews, setDepartmentNews] = useState([]);
    const [otherNews, setOtherNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(2); // Display 2 posts per page

    useEffect(() => {
        getList();
        getOtherNews();
    }, []);

    const getList = async () => {
        setLoading(true);
        try {
            const res = await request("administration/getList", "get");
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

    const getOtherNews = async () => {
        setLoading(true);
        try {
            const res = await request("tbmarquee/getlist", "get");
            if (res && res.list) {
                setOtherNews(res.list);
            }
        } catch (error) {
            message.error("Failed to fetch other news");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedDepartmentNews = departmentNews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div style={containerStyle}>
            <br></br>
               {/* <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}> */}
                            <Row gutter={[16, 16]} justify="center">
                                {/* Main Content */}
                                <Col xs={24} sm={24} md={18} lg={16} xl={16}>
                                    {list.map((item, index) => (
                                        <Card key={index} style={{ marginBottom: '16px', padding: '20px' }}>
                                        <p>
                                        <img
                                        alt="avatar"
                                        src={Config.image_path + item.Image}
                                        
                                    />
                    <p
                        style={{
                            marginTop: '20px',
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            color: '#343293'
                        }}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                </p>
                

                                        </Card>
                                    ))}
                                </Col>

                                {/* Sidebar */}
                                <Col xs={24} sm={24} md={6} lg={8} xl={8}>
                                    <Card style={{ padding: '16px', textAlign: 'left' }}>
                                        <h2 style={{ color: '#343293' }}>លិខិតផ្សេងៗ</h2>
                                        <Divider />
                                    </Card>
                                </Col>
                            </Row>
                        {/* </div> */}

        </div>
     
    );
};

export default AdministrationPageView;
