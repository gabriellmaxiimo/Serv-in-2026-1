import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Form,
  Input,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import useEvent from "../../../hooks/event/useEvent";
import Search from "antd/es/input/Search";

import * as S from "./styles";
import Button from "../../common/button/Button";

const CreateEvent: React.FC = () => {
  const {
    setTitle,
    setDescription,
    setStartDate,
    setEndDate,
    onSearch,
    fetchEvent,
    beforeUpload,
    handleChange,
    imageUrl,
    loading,
  } = useEvent();

  const [form] = Form.useForm();

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleSearch = async (value: string) => {
    const data = await onSearch(value);
    if (data) {
      form.setFieldsValue({
        eventCEP: data.cep,
        eventState: data.uf,
        eventCity: data.localidade || data.city,
        eventNeighborhood: data.bairro || data.neighborhood,
        eventStreet: data.logradouro || data.street,
      });
    }
  };

  return (
    <Form form={form} onFinish={fetchEvent}>
      <Form.Item
        layout="vertical"
        label="Nome do Evento"
        name="eventName"
        rules={[
          { required: true, message: "Por favor, insira o nome do evento!" },
        ]}
      >
        <Input
          placeholder="Digite o nome do evento"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        layout="vertical"
        name="eventDescription"
        label="Descrição do Evento"
        rules={[
          {
            required: false,
            message: "Por favor, insira a descrição do evento!",
          },
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Digite a descrição do evento"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>

      <div style={{ display: "flex", gap: "16px" }}>
        <Form.Item
          layout="vertical"
          name="eventDate"
          label="Data do Evento"
          rules={[
            {
              required: true,
              message: "Por favor, selecione a data do evento!",
            },
          ]}
        >
          <DatePicker
            format="DD/MM/YYYY HH:mm"
            onChange={(date) => date && setStartDate(date)}
            placeholder="Data inicial"
            showTime
          />
        </Form.Item>

        <Form.Item
          layout="vertical"
          name="eventEndDate"
          label="Data de Encerramento"
          rules={[
            {
              required: false,
              message: "Por favor, selecione a data de encerramento!",
            },
          ]}
        >
          <DatePicker
            format="DD/MM/YYYY HH:mm"
            onChange={(date) => setEndDate(date)}
            placeholder="Data final"
            showTime
          />
        </Form.Item>
      </div>

      <S.LocationContainer>
        <Form.Item
          layout="vertical"
          label="CEP"
          name="eventCEP"
          rules={[
            {
              required: true,
              message: "Por favor, insira a localização do evento!",
            },
          ]}
        >
            <Search placeholder="CEP" onSearch={handleSearch} style={{ width: 200 }} />
        </Form.Item>

        <Form.Item
          layout="vertical"
          label="Estado"
          name="eventState"
          rules={[
            {
              required: true,
              message: "Por favor, insira a localização do evento!",
            },
          ]}
        >
            <Input
              style={{ width: "100%" }}
            />
        </Form.Item>

        <Form.Item
          layout="vertical"
          label="Cidade"
          name="eventCity"
          rules={[
            {
              required: true,
              message: "Por favor, insira a localização do evento!",
            },
          ]}
        >
            <Input
              style={{ width: "100%" }}
            />
        </Form.Item>

        <Form.Item
          layout="vertical"
          label="Bairro"
          name="eventNeighborhood"
          rules={[
            {
              required: true,
              message: "Por favor, insira a localização do evento!",
            },
          ]}
        >
            <Input
              style={{ width: "100%" }}
            />
        </Form.Item>

        <Form.Item
          layout="vertical"
          label="Logradouro"
          name="eventStreet"
          rules={[
            {
              required: true,
              message: "Por favor, insira a localização do evento!",
            },
          ]}
        >
            <Input
              style={{ width: "100%" }}
            />
        </Form.Item>
      </S.LocationContainer>

      <Form.Item
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={({ onSuccess }) => {
            setTimeout(() => {
              if (onSuccess) onSuccess("ok");
            }, 0);
          }}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Form.Item>
          <Button 
            onClick={() => {}} 
            type="primary" 
            htmlType="submit" 
            style={{ backgroundColor: "#1677ff", borderColor: "#1677ff" }}
          >
            <PlusOutlined></PlusOutlined>
            Criar Evento
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateEvent;
