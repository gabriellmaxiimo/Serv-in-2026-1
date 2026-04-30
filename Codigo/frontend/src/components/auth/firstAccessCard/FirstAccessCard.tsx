import { Input, Form } from "antd";
import { UserOutlined, LockOutlined, LoadingOutlined, LeftOutlined } from "@ant-design/icons";
import { firstAccessBackground, logoServin } from "../../../assets";
import { maskCPF } from "../../../functions/maskCpf";
import useFirstAccess from "../../../hooks/auth/useFirstAccess";
import * as S from "./styles";

const FirstAccessCard = () => {
    const { setCpfFA, setPasswordFA, fetchFirstAccess, loading } = useFirstAccess();
    const [form] = Form.useForm();

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const maskedValue = maskCPF(rawValue);
        const onlyNumbers = rawValue.replace(/\D/g, "");

        form.setFieldsValue({ cpf: maskedValue });
        setCpfFA(onlyNumbers);
    };

    return (
        <S.FirstAccessPageBackground>
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
                            onFinish={fetchFirstAccess}
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
                                    onChange={(e) => setPasswordFA(e.target.value)}
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
                                        Cadastrar
                                    </S.CustomButtonStyle>

                                    <S.CustomButtonStyle
                                        onClick={() => window.location.href = "/login"}
                                        style={{ backgroundColor: "#030431", height: "45px" }}
                                        type="primary"
                                        size="large"
                                    >
                                        <LeftOutlined /> Voltar
                                    </S.CustomButtonStyle>
                            </S.ButtonContainer>
                        </Form>
                    </S.LoginCardContainer>
                )}
            </S.FormSection>

            <S.ImageSection>
                <img src={firstAccessBackground} alt="Background Evento" />
            </S.ImageSection>
        </S.FirstAccessPageBackground>
    );
};

export default FirstAccessCard;