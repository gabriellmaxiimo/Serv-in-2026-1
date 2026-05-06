import { Input, Form } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined, RightOutlined } from "@ant-design/icons";
import useLogin from "../../../hooks/auth/useLogin";
import { loginEventPage, logoServin } from "../../../assets";
import { maskCPF } from "../../../functions/maskCpf";
import * as S from "./styles";
import { useEffect } from "react";

const LoginCard = () => {
    useEffect(() => {
        const topbar = document.querySelector(".topbar");
        const navbar = document.querySelector(".navbar");

        if (topbar) (topbar as HTMLElement).style.display = "none";
        if (navbar) (navbar as HTMLElement).style.display = "none";

        return () => {
            if (topbar) (topbar as HTMLElement).style.display = "";
            if (navbar) (navbar as HTMLElement).style.display = "";
        };
    }, []);

    const { setCpf, setPassword, fetchLogin, loading } = useLogin();
    const [form] = Form.useForm();

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        const maskedValue = maskCPF(rawValue);
        const onlyNumbers = rawValue.slice(0, 11);

        form.setFieldsValue({ cpf: maskedValue });
        setCpf(onlyNumbers);
    };

    return (
        <S.LoginPageBackground>
            <S.ImageSection>
                <img src={loginEventPage} alt="Background Evento" />
            </S.ImageSection>

            <S.FormSection>
                {loading ? (
                    <LoadingOutlined style={{ color: "#181880", fontSize: 48 }} />
                ) : (
                    <S.LoginCardContainer>
                        <img 
                            src={logoServin} 
                            style={{ height: "180px", marginBottom: "20px" }} 
                            alt="Logo Servin" 
                        />
                        
                        <Form 
                            form={form}
                            name="first_access_form" 
                            layout="vertical" 
                            onFinish={fetchLogin}
                            style={{ width: "100%" }}
                        >
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

                            <S.ButtonContainer>
                                    <S.CustomButtonStyle 
                                        type="primary" 
                                        htmlType="submit"
                                        style={{ backgroundColor: "#030431", height: "45px" }}
                                        size="large"
                                        onClick={() => {}}
                                    >
                                        Entrar
                                    </S.CustomButtonStyle>

                                    <S.CustomButtonStyle
                                        onClick={() => window.location.href = "/first-access"}
                                        style={{ backgroundColor: "#030431", height: "45px" }}
                                        type="primary"
                                        size="large"
                                    >
                                        Primeiro Acesso <RightOutlined />
                                    </S.CustomButtonStyle>
                            </S.ButtonContainer>
                        </Form>
                    </S.LoginCardContainer>
                )}
            </S.FormSection>
        </S.LoginPageBackground>
    );
};

export default LoginCard;
