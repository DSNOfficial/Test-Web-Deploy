import { useEffect, useState, useRef } from "react";
import { request } from "../config/request";
import { Table, Button, Space, Modal, Input, Form, Select, message, Row, Col } from "antd";
import MainPage from "../component/page/MainPage";
import "../component/assets/css/TextEditor.css";
import dayjs from "dayjs";
import { formatDateClient, formatDateServer } from "../config/helper";

const UserPage = () => {
    const [list, setList] = useState([]);
    const [role, setRole] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formCat] = Form.useForm();
    const [formPassword] = Form.useForm();

    useEffect(() => {
        getList();
        formCat.setFieldsValue({ Status: "1" });
    }, []);

    const filterRef = useRef({ txt_search: null, status: null });

    const getList = async () => {
        setLoading(true);
        const param = {
            txt_search: filterRef.current.txt_search,
            status: filterRef.current.status,
        };
        const res = await request("user/getlist", "get", param);
        setLoading(false);
        if (res) {
            setList(res.list);
            setRole(res.role);
        }
    };

    const onClickBtnEdit = (item) => {
        formCat.setFieldsValue({
            id: item.id,
            RoleId: item.RoleId,
            firstName: item.firstName,
            middleName: item.middleName,
            lastName: item.lastName,
            mobile: item.mobile,
            email: item.email,
            intro: item.intro,
            profile: item.profile,
        });
        setOpen(true);
    };

    const onClickBtnDelete = (item) => {
        Modal.confirm({
            title: "លុប",
            content: "តើលោកអ្នកចង់លុបមែន ឬទេ?",
            okText: "Yes",
            cancelText: "No",
            okType: "danger",
            centered: true,
            onOk: async () => {
                const data = { id: item.id };
                const res = await request("user/delete", "delete", data);
                if (res) {
                    message.success(res.message);
                    getList();
                }
            },
        });
    };

    const onClickBtnSetPassword = (item) => {
        setSelectedUser(item);
        formPassword.resetFields();
        setPasswordModalOpen(true);
    };

    const onFinish = async (item) => {
        const id = formCat.getFieldValue("id");
        const data = {
            id: id,
            RoleId: item.RoleId,
            firstName: item.firstName,
            middleName: item.middleName,
            lastName: item.lastName,
            mobile: item.mobile,
            email: item.email,
            intro: item.intro,
            profile: item.profile,
            Password: item.Password,
        };
        const method = id == null ? "post" : "put";
        const url = id == null ? "user/create" : "user/update";
        const res = await request(url, method, data);
        if (res) {
            message.success(res.message);
            getList();
            onCloseModule();
        }
    };

    const onFinishPassword = async (values) => {
        const data = {
            mobile: selectedUser.mobile,
            Password: values.Password,
            ConfirmPassword: values.ConfirmPassword,
        };
        const res = await request("user/setpassword", "post", data);
        if (res) {
            message.success(res.message);
            setPasswordModalOpen(false);
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

    const onCloseModule = () => {
        formCat.resetFields();
        setOpen(false);
    };
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

    return (
        <MainPage loading={loading}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10 }}>
                <Space>
                    <div className="txt_title">គណនីប្រើប្រាស់</div>
                    <Input.Search allowClear onChange={onChangeSearch} placeholder="ស្វែងរក" />
                </Space>
                <Button onClick={() => setOpen(true)} type="primary">បន្ថែមថ្មី</Button>
            </div>
            <hr />
            <Table
                dataSource={list}
                pagination={{ pageSize: 7 }}
                columns={[
                    {
                        key: "No",
                        title: "ល.រ",
                      
                        align: 'left',
                        width:60,
                        render: (value, item, index) => index + 1,
                    },
                    {
                        key: "mobile",
                        title: "គណនី",
                        dataIndex: "mobile",
                    },
                    {
                        key: "email",
                        title: "អ៊ីម៉ែល",
                        dataIndex: "email",
                    },
                    {
                        key: "RoleId",
                        title: "ការអនុញ្ញាត",
                        dataIndex: "RoleId",
                        render: (RoleId) => role.find(r => r.id === RoleId)?.name || 'Unknown',
                    },
                    {
                        key: "create_at",
                        title: "ថ្ងៃបង្កើត",
                        dataIndex: "created_at",
                        render: (value) => formatKhmerDate(value)
                    },
                    {
                        key: "Action",
                        title: "កែប្រែ / លុប​ / ប្តូរពាក្យសម្ងាត់",
                        render: (value, item) => (
                            <Space>
                            <Button onClick={() => onClickBtnEdit(item)}>កែប្រែ</Button>
                            <Button onClick={() => onClickBtnDelete(item)} danger>លុប</Button>
        
                                <Button onClick={() => onClickBtnSetPassword(item)} type="primary">ប្តូរពាក្យសម្ងាត់</Button>
                            </Space>
                        ),
                    },
                ]}
            />
            <Modal
                title={formCat.getFieldValue("id") == null ? "គណនី | បន្ថែមថ្មី" : "គណនី | កែប្រែ"}
                open={open}
                onCancel={onCloseModule}
                footer={null}
                maskClosable={false}
            >
                <Form form={formCat} layout="vertical" onFinish={onFinish}>
                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item
                                label="គណនី"
                                name="mobile"
                                rules={[{ required: true, message: "សូមបំពេញគណនី!" }]}
                            >
                                <Input style={{ width: "100%" }} placeholder="គណនី" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="អ៊ីម៉ែល"
                                name="email"
                                rules={[{ required: true, message: "សូមបំពេញអ៊ីមែល!" }]}
                            >
                                <Input style={{ width: "100%" }} placeholder="អ៊ីមែល" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="គោត្តនាម"
                                name="firstName"
                                rules={[{ required: true, message: "សូមបំពេញគោត្តនាម!" }]}
                            >
                                <Input style={{ width: "100%" }} placeholder="គោត្តនាម" />
                            </Form.Item>
                        </Col>
                        {/* <Col span={12}>
                            <Form.Item
                                label="Middle Name"
                                name="middleName"
                            >
                                <Input style={{ width: "100%" }} placeholder="Middle Name" />
                            </Form.Item>
                        </Col> */}
                        <Col span={12}>
                            <Form.Item
                                label="នាម"
                                name="lastName"
                                rules={[{ required: true, message: "សូមបំពេញនាម!" }]}
                            >
                                <Input style={{ width: "100%" }} placeholder="នាម" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="ការអនុញ្ញាត"
                                name="RoleId"
                                rules={[{ required: true, message: "សូមបំពេញការអនុញ្ញាត!" }]}
                            >
                                <Select placeholder="Please select role">
                                    {role.map((item) => (
                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        </Row>
                        {formCat.getFieldValue("id") == null && (
                        <Row gutter={5}>
                            <Col span={12}>
                                <Form.Item
                                    label="កំណត់ពាក្យសម្ងាត់"
                                    name="Password"
                                    rules={[{ required: true, message: "សូមបំពេញពាក្យសម្ងាត់!" }]}
                                >
                                    <Input.Password style={{ width: "100%" }} placeholder="ពាក្យសម្ងាត់" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់"
                                    name="ConfirmPassword"
                                    dependencies={['Password']}
                                    rules={[
                                        { required: true, message: "សូមបំពេញពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់!" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('Password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password style={{ width: "100%" }} placeholder="ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់" />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                label="ផ្សេងៗ​ (មិនបំពេញក៏បាន)"
                                name="intro"
                            >
                                <Input style={{ width: "100%" }} placeholder="ផ្សេងៗ" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="រូបថត (មិនបំពេញក៏បាន)"
                                name="profile"
                            >
                                <Input style={{ width: "100%" }} placeholder="រូបថត" />
                            </Form.Item>
                        </Col>
                    </Row>
                 
           
                    <Form.Item style={{ textAlign: "right" }}>
                        <Space>
                            <Button onClick={onCloseModule}>Cancel</Button>
                            <Button type="primary" htmlType="submit">
                                {formCat.getFieldValue("id") == null ? "រក្សាទុក" : "កែប្រែ"}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="ការកំណត់ពាក្យសម្ងាត់"
                open={passwordModalOpen}
                onCancel={() => setPasswordModalOpen(false)}
                footer={null}
                maskClosable={false}
            >
                <Form form={formPassword} layout="vertical" onFinish={onFinishPassword}>
                    <Row gutter={5}>
                        <Col span={24}>
                            <Form.Item
                                label="កំណត់ពាក្យសម្ងាត់"
                                name="Password"
                                rules={[{ required: true, message: "Please input password!" }]}
                            >
                                <Input.Password style={{ width: "100%" }} placeholder="Password" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់"
                                name="ConfirmPassword"
                                dependencies={['Password']}
                                rules={[
                                    { required: true, message: "សូមបំពេញពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('Password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password style={{ width: "100%" }} placeholder="Confirm Password" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item style={{ textAlign: "right" }}>
                        <Space>
                            <Button onClick={() => setPasswordModalOpen(false)}>Cancel</Button>
                            <Button type="primary" htmlType="submit">Set Password</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </MainPage>
    );
};

export default UserPage;
