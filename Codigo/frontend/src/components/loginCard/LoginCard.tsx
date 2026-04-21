import { Flex, Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginCardContainer } from "./styles";
import useLogin from "../../hooks/auth/useLogin";
import { servinIcon } from "../../assets";
import { maskCPF } from "../../functions/maskCpf";

const LoginCard = () => {
    const { setCpf, setPassword, fetchLogin } = useLogin();
    const [form] = Form.useForm();

    const handleCpfChange = (e: any) => {
        const rawValue = e.target.value;
        const maskedValue = maskCPF(rawValue);
        const onlyNumbers = rawValue.replace(/\D/g, "");

        form.setFieldsValue({ cpf: maskedValue });
        
        setCpf(onlyNumbers);
    };

    return (
        <LoginCardContainer>
            <img src={servinIcon} style={{ height: "150px" }} alt="Logo" />
            
            <Form 
                form={form}
                name="login_form" 
                layout="vertical" 
                onFinish={fetchLogin}
            >
                <Flex vertical gap="middle">
                    <Form.Item
                        name="cpf"
                        rules={[{ required: true, message: 'Por favor, insira seu CPF!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined />} 
                            placeholder="000.000.000-00" 
                            size="large"
                            onChange={handleCpfChange}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Por favor, insira sua senha!' },
                            { min: 6, message: 'No mínimo 6 caracteres!' }
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />} 
                            placeholder="Senha" 
                            size="large"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            block 
                            size="large"
                            style={{ backgroundColor: "#31553B" }}
                        >
                            Entrar
                        </Button>
                    </Form.Item>
                </Flex>

                <Button 
                    type="primary" 
                    block 
                    size="large"
                    onClick={() => window.location.href = "/first-access"}
                    style={{ backgroundColor: "#181880" }}
                >
                    Primeiro acesso
                </Button>
            </Form>
        </LoginCardContainer>
    );
};
export default LoginCard;
