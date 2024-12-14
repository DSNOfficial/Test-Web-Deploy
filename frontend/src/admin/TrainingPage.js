import { useEffect, useState, useRef } from "react";
import { request } from "../config/request";
import { Table, Button, Space, Modal, Input, Form, Image, message,Row,Col } from "antd";
import { Config, isEmptyOrNull } from "../config/helper";
import MainPage from "../component/page/MainPage";
import dayjs from "dayjs";
import { CloseOutlined, DeleteFilled, UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const TrainingPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false); // State for view modal
    const [selectedTraining, setSelectedTraining] = useState(null); // State for selected training details
    const [formCat] = Form.useForm();
    const [fileSelected, setFileSelected] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    useEffect(() => {
        formCat.setFieldsValue({
            Status: "1"
        });
        getList();
    }, []);

    const filterRef = useRef({
        txt_search: null,
        status: null,
        role_id: null
    });

    const fileRef = useRef(null);

    const getList = async () => {
        setLoading(true);
        var param = {
            txt_search: filterRef.current.txt_search,
            status: filterRef.current.status,
            role_id: filterRef.current.role_id,
        };
        const res = await request("training/getList", "get", param);
        setLoading(false);
        if (res) {
            setList(res.list);
        }
    };

    const onClickBtnEdit = (item) => {
        formCat.setFieldsValue({
            ...item,
            "image": item.Image
        });
        setFilePreview(Config.image_path + item.Image);
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
                var data = {
                    id: item.id
                };
                const res = await request("training/delete", "delete", data);
                if (res) {
                    message.success(res.message);
                    getList();
                }
            }
        });
    };

    const onClickBtnView = (item) => {
        setSelectedTraining(item);
        setViewOpen(true);
    };

    const onFinish = async (item) => {
        var id = formCat.getFieldValue("id");
        var form = new FormData();
        form.append("id", id);
        form.append("title", item.title);
        form.append("description", item.description);
        form.append("PreImage", formCat.getFieldValue("image"));
        if (fileSelected != null) {
            form.append("image", fileSelected);
        }
        var method = (id == null ? "post" : "put");
        const url = (id == null ? "training/create" : "training/update");
        const res = await request(url, method, form);
        if (res) {
            if (res.error) {
                var mgs = "";
                Object.keys(res.message).map((key, index) => {
                    mgs += res.message[key];
                });
                message.error(mgs);
                return false;
            }
            message.success(res.message);
            getList();
            onCloseModal();
            window.location.reload();
        }
    };

    const onTextSearch = (value) => { };

    const onChangeSearch = (e) => {
        filterRef.current.txt_search = (e.target.value);
        getList();
    };

    const onChangeStatus = (value) => {
        filterRef.current.value = value;
        getList();
    };

    const onCloseModal = () => {
        formCat.resetFields();
        formCat.setFieldsValue({
            Status: "1"
        });
        setOpen(false);
        onRemoveFileSelected();
    };

    const onRemoveFileSelected = () => {
        fileRef.current.value = null;
        setFileSelected(null);
        setFilePreview(null);
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const filePreview = URL.createObjectURL(file);
            setFileSelected(file);
            setFilePreview(filePreview);
        }
    };

    const toKhmerNumeral = (num) => {
        const khmerNumerals = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
        return num.toString().split('').map(digit => khmerNumerals[digit]).join('');
    };

    const formatKhmerDate = (date) => {
        const day = toKhmerNumeral(dayjs(date).date());
        const month = dayjs(date).locale('km').format('MMMM');
        const year = toKhmerNumeral(dayjs(date).year());
        return `ថ្ងៃទី${day} ខែ${month} ${year}`;
    };

    return (
        <MainPage loading={loading}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10 }}>
                <Space>
                    <div className="txt_title">វគ្គបណ្តុះបណ្តាល</div>
                    <Input.Search allowClear onChange={onChangeSearch} placeholder="ស្វែងរក" onSearch={onTextSearch} />
                </Space>

                <Button onClick={() => { setOpen(true) }} type="primary">បន្ថែមថ្មី</Button>
            </div>
            <Table
                dataSource={list}
                pagination={{
                    pageSize: 5,
                }}
                columns={[
                    {
                        key: "No",
                        title: "ល.រ",
                        dataIndex: "Name",
                        align: 'left',
                        width: 60,
                        render: (value, item, index) => (index + 1)
                    },
                    {
                        key: "title",
                        title: "ចំណង់ជើង",
                        dataIndex: "title",
                        ellipsis: true,
                        width: 120,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        webkitLineClamp: 3,
                    },
                    {
                        key: "description",
                        title: "មាតិកា",
                        dataIndex: "description",
                        ellipsis: true,
                        width: '20',
                    },
                    {
                        key: "Image",
                        title: "រូបភាព",
                        dataIndex: "Image",
                        render: (value) => {
                            if (value != null && value != "") {
                                return (
                                    <Image
                                        src={Config.image_path + value}
                                        alt=""
                                        width={60}
                                    />
                                )
                            } else {
                                return (
                                    <div style={{ height: 40, width: 60, backgroundColor: "#888" }} />
                                )
                            }

                        }
                    },
                    {
                        key: "createdAt",
                        title: "ថ្ងៃបង្កើត",
                        dataIndex: "createdAt",
                        render: (value) => formatKhmerDate(value)
                    },
                    {
                        key: "Action",
                        title: "កែប្រែ/លុប",
                        dataIndex: "Status",
                        align: 'right',
                        width: 220,
                        render: (value, item, index) => (
                            <Space>
                                <Button onClick={() => onClickBtnView(item)}>មើល</Button> {/* View button */}
                                <Button onClick={() => onClickBtnEdit(item)}>កែប្រែ</Button>
                                <Button onClick={() => onClickBtnDelete(item)} danger>លុប</Button>
                            </Space>
                        )
                    }
                ]}
            />
            <Modal
                title={(formCat.getFieldValue("id") == null) ? "វគ្គបណ្តុះបណ្តាល | បន្ថែមថ្មី" : " វគ្គបណ្តុះបណ្តាល | កែប្រែ"}
                open={open}
                onCancel={onCloseModal}
                footer={null}
                width={600}
                maskClosable={false}
            >

                <Form
                    form={formCat}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Row gutter={5}>
                        <Col span={24}>
                            <Form.Item
                                label=" ចំណង់ជើង"
                                name={"title"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'សូមបំពេញចំណង់ជើង!',
                                    },
                                ]}
                            >
                                <Input placeholder="ចំណង់ជើង" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="មាតិកា"
                                name={"description"}
                                rules={[
                                    {
                                        required: true,
                                        message: "សូមបំពេញមាតិកា!",
                                    }
                                ]}
                            >
                                <TextArea style={{ width: "100%" }} placeholder="មាតិកា" rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item
                                label="Upload រូបភាព"
                            >
                                <>
                                    <div style={{ width: "90%", position: 'relative' }}>
                                        {!isEmptyOrNull(filePreview) &&
                                            <CloseOutlined
                                                onClick={onRemoveFileSelected}
                                                style={{ color: "red", fontSize: 18, position: 'absolute', top: -6, right: -6, backgroundColor: "#EEE", padding: 3 }} />
                                        }
                                        {!isEmptyOrNull(filePreview) ?
                                            <img
                                                src={filePreview}
                                                style={{ width: "90%" }}
                                                alt=""
                                            />
                                            :
                                            <div style={{ width: 70, height: 70, backgroundColor: '#EEE' }}></div>
                                        }
                                    </div>
                                    <input onChange={handleChangeFile} ref={fileRef} type="file" id="selectedFile" style={{ display: "none" }} />
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

                    <Form.Item style={{ textAlign: "right" }}>
                        <Space>
                            <Button onClick={onCloseModal}>បដិសេធ</Button>
                            <Button type="primary" htmlType="submit">{formCat.getFieldValue("id") == null ? "រក្សាទុក" : "កែប្រែ"}</Button>
                        </Space>
                    </Form.Item>

                </Form>

            </Modal>
            <Modal
                title="វគ្គបណ្តុះបណ្តាល | មើល"
                open={viewOpen}
                onCancel={() => setViewOpen(false)}
                footer={null}
                width={600}
                maskClosable={false}
            >
                {selectedTraining && (
                    <div>
                        <h3>ចំណង់ជើង: {selectedTraining.title}</h3>
                        <p>មាតិកា: {selectedTraining.description}</p>
                        {selectedTraining.Image && (
                            <Image
                                src={Config.image_path + selectedTraining.Image}
                                alt="រូបភាព"
                                width={200}
                            />
                        )}
                        <p>ថ្ងៃបង្កើត: {formatKhmerDate(selectedTraining.createdAt)}</p>
                    </div>
                )}
            </Modal>
        </MainPage>
    )
}

export default TrainingPage;
