import { useEffect, useState, useRef } from "react";
import { request } from "../config/request";
import { Table, Button, Space, Modal, Input, Form, Select, message, Image, Row, Col } from "antd";
import { Config, isEmptyOrNull } from "../config/helper";
import MainPage from "../component/page/MainPage";
import { CloseOutlined, UploadOutlined, EyeOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const MissionPage = () => {
    const [list, setList] = useState([]);
    const [codes, setCodes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false); // State for view modal
    const [selectedItem, setSelectedItem] = useState(null); // State for the selected item
    const [formCat] = Form.useForm();
    const [fileSelected, setFileSelected] = useState(null); // for API
    const [filePreview, setFilePreview] = useState(null); // for client preview

    useEffect(() => {
        formCat.setFieldsValue({ Status: "1" });
        getList();
        getCodes();
    }, [formCat]);

    const filterRef = useRef({ txt_search: null, status: null, code_id: null });
    const fileRef = useRef(null);

    const generateUniqueCode = () => {
        const currentYear = new Date().getFullYear();

        // Find the highest number for the current year from existing codes
        const highestCode = codes.reduce((max, code) => {
            const [prefix, num, year] = code.code.split("-");
            const codeYear = parseInt(year, 10);
            if (codeYear === currentYear) {
                const codeNum = parseInt(num, 10);
                return codeNum > max ? codeNum : max;
            }
            return max;
        }, 0);

        // Generate the next code in the sequence
        const nextCode = highestCode + 1;

        // Format the code as "CODE-xxx-Year"
        return `CODE-${String(nextCode).padStart(3, '0')}-${currentYear}`;
    };

    const getList = async () => {
        setLoading(true);
        try {
            const param = {
                txt_search: filterRef.current.txt_search,
                status: filterRef.current.status,
                code_id: filterRef.current.code_id,
            };
            const res = await request("mission/getList", "get", param);
            console.log('getList response:', res); // Add logging here
            if (res) setList(res.list);
        } catch (error) {
            console.error('getList error:', error); // Add logging here
            message.error("Failed to fetch list");
        } finally {
            setLoading(false);
        }
    };

    const getCodes = async () => {
        try {
            const res = await request("coder/getList", "get");
            console.log('getCodes response:', res); // Add logging here
            if (res) setCodes(res.list);
        } catch (error) {
            console.error('getCodes error:', error); // Add logging here
            message.error("Failed to fetch codes");
        }
    };

    const onClickBtnEdit = (item) => {
        formCat.setFieldsValue({ ...item, image: item.Image, code_id: item.code_id });
        setFilePreview(Config.image_path + item.Image);
        setOpen(true);
    };

    const onClickAddNew = () => {
        formCat.setFieldsValue({
            Status: "1",
            code_id: generateUniqueCode()  // Set the generated code
        });
        setOpen(true);
    };

    const onClickBtnDelete = async (item) => {
        Modal.confirm({
            title: "លុប",
            content: "តើលោកអ្នកចង់លុបមែន ឬទេ?",
            okText: "លុប",
            cancelText: "បដិសេធ",
            okType: "danger",
            centered: true,
            onOk: async () => {
                try {
                    const res = await request("mission/delete", "delete", { id: item.id });
                    console.log('delete response:', res); // Add logging here
                    if (res) {
                        message.success(res.message);
                        getList();
                    }
                } catch (error) {
                    console.error('delete error:', error); // Add logging here
                    message.error("Failed to delete item");
                }
            }
        });
    };

    const onFinish = async (item) => {
        try {
            const id = formCat.getFieldValue("id");
            const form = new FormData();
            form.append("id", id);
            form.append("title", item.title);
            form.append("description", item.description);
            form.append("status", item.status);
            form.append("PreImage", formCat.getFieldValue("image"));
            if (fileSelected) form.append("image", fileSelected);

            const method = id == null ? "post" : "put";
            const url = id == null ? "mission/create" : "mission/update";
            const res = await request(url, method, form);

            console.log('form submit response:', res); // Add logging here

            if (res?.error) {
                const mgs = Object.values(res.message).join("");
                message.error(mgs);
            } else {
                message.success(res.message);
                getList();
                onCloseModal();
            }
        } catch (error) {
            console.error('form submit error:', error); // Add logging here
            message.error("Failed to save item");
        }
    };

    const onChangeSearch = (e) => {
        filterRef.current.txt_search = e.target.value;
        getList();
    };

    const onChangeStatus = (value) => {
        filterRef.current.status = value;
        getList();
    };

    const onCloseModal = () => {
        formCat.resetFields();
        formCat.setFieldsValue({ Status: "1" });
        setOpen(false);
        onRemoveFileSelected();
    };

    const onChangeFile = (e) => {
        const file = e.target.files[0];
        const filePreview = URL.createObjectURL(file);
        setFileSelected(file);
        setFilePreview(filePreview);
    };

    const onRemoveFileSelected = () => {
        fileRef.current.value = null;
        setFileSelected(null);
        setFilePreview(null);
    };

    const onViewItem = (item) => {
        setSelectedItem(item);
        setViewOpen(true);
    };

    const onCloseViewModal = () => {
        setViewOpen(false);
        setSelectedItem(null);
    };

    return (
        <MainPage loading={loading}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10 }}>
                <Space>
                    <div className="txt_title">បេសសកម្ម</div>
                    <Input.Search allowClear onChange={onChangeSearch} placeholder="ស្វែងរក" />
                </Space>
                <Button onClick={onClickAddNew} type="primary">បន្ថែមថ្មី</Button>
            </div>
            <Table
                dataSource={list}
                pagination={{ pageSize: 5 }}
                columns={[
                    {
                        key: "No",
                        title: "ល.រ",
                        align: 'left',
                        width: 60,
                        render: (value, item, index) => index + 1
                    },
                    {
                        key: "title",
                        title: "ចំណង់ជើង",
                        dataIndex: "title",
                        ellipsis: true,
                    },
                    // {
                    //     key: "description",
                    //     title: "មាតិកា",
                    //     dataIndex: "description",
                    //     ellipsis: true,
                    //     width: 200,
                    //     display: '-webkit-box',
                    //     overflow: 'hidden',
                    //     WebkitBoxOrient: 'vertical',
                    //     webkitLineClamp: 3,
                    // },
                    {
                        key: "Image",
                        title: "រូបភាព",
                        dataIndex: "Image",
                        render: (value) => (
                            value ? (
                                <Image src={Config.image_path + value} alt="" width={60} />
                            ) : (
                                <div style={{ height: 40, width: 60, backgroundColor: "#888" }} />
                            )
                        )
                    },
                  
                    {
                        key: "Action",
                        title: "សកម្មភាព",
                        dataIndex: "Status",
                        align: 'right',
                        width: 260,
                        render: (value, item) => (
                            <Space>
                                <Button icon={<EyeOutlined />} onClick={() => onViewItem(item)}>មើល</Button>
                                <Button onClick={() => onClickBtnEdit(item)}>កែប្រែ</Button>
                                <Button onClick={() => onClickBtnDelete(item)} danger>លុប</Button>
                            </Space>
                        )
                    }
                ]}
            />
            <Modal
                title={formCat.getFieldValue("id") == null ? "បេសសកម្ម | បន្ថែមថ្មី" : "បេសសកម្ម | កែប្រែ"}
                open={open}
                onCancel={onCloseModal}
                footer={null}
                width={600}
                maskClosable={false}
            >
                <Form form={formCat} layout="vertical" onFinish={onFinish}>
                    <Row gutter={5}>
                        <Col span={24}>
                            <Form.Item
                                label="ចំណង់ជើង"
                                name={"title"}
                                rules={[{ required: true, message: 'សូមបំពេញចំណង់ជើង!' }]}
                            >
                                <Input placeholder="ចំណង់ជើង" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={5}>
                        <Col span={24}>
                            <Form.Item
                                label="មាតិកា"
                                name={"description"}
                                rules={[{ required: true, message: "សូមបំពេញមាតិកា!" }]}
                            >
                                <TextArea style={{ width: "100%" }} placeholder="មាតិកា" rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item label="Upload រូបភាព">
                                <>
                                    <div style={{ width: "90%", position: 'relative' }}>
                                        {!isEmptyOrNull(filePreview) && (
                                            <CloseOutlined
                                                onClick={onRemoveFileSelected}
                                                style={{ color: "red", fontSize: 18, position: 'absolute', top: -6, right: -6, backgroundColor: "#EEE", padding: 3 }}
                                            />
                                        )}
                                        {!isEmptyOrNull(filePreview) ? (
                                            <img src={filePreview} style={{ width: "90%" }} alt="" />
                                        ) : (
                                            <div style={{ width: 70, height: 70, backgroundColor: '#EEE' }}></div>
                                        )}
                                    </div>
                                    <input onChange={onChangeFile} ref={fileRef} type="file" id="selectedFile" style={{ display: "none" }} />
                                    <Button
                                        icon={<UploadOutlined />}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById('selectedFile').click();
                                        }}
                                        style={{ marginTop: 10, marginLeft: 3, width: "50%" }}
                                    >
                                        Browse...
                                    </Button>
                                </>
                            </Form.Item>
                        </Col>
                    </Row>
                    {/* <Row gutter={5}>
                        <Col span={24}>
                            <Form.Item
                                label="Status"
                                name={"status"}
                            >
                                <Select placeholder="Select a code">
                                    <Option key="generated" value={formCat.getFieldValue("code_id")}>
                                        {formCat.getFieldValue("code_id")}
                                    </Option>
                                    {codes.map((code) => (
                                        <Option key={code.id} value={code.id}>{code.code}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row> */}
                    <Form.Item style={{ textAlign: "right" }}>
                        <Space>
                            <Button onClick={onCloseModal}>បដិសេធ</Button>
                            <Button type="primary" htmlType="submit">{formCat.getFieldValue("id") == null ? "រក្សាទុក" : "កែប្រែ"}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="View Mission"
                open={viewOpen}
                onCancel={onCloseViewModal}
                footer={null}
                width={600}
                maskClosable={false}
            >
                {selectedItem && (
                    <div>
                        <p><strong>ចំណង់ជើង:</strong> {selectedItem.title}</p>
                        <p><strong>មាតិកា:</strong> {selectedItem.description}</p>
                        {selectedItem.Image && (
                            <Image src={Config.image_path + selectedItem.Image} alt="" style={{ width: "100%" }} />
                        )}
                        <p><strong>Status:</strong> {selectedItem.status}</p>
                    </div>
                )}
            </Modal>
        </MainPage>
    );
};

export default MissionPage;
