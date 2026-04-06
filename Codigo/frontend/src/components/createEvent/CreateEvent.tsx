import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Upload,
  type GetProp,
  type UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import useEvent from "../../hooks/event/useEvent";

const CreateEvent: React.FC = () => {
  const {
    setTitle,
    setDescription,
    setStartDate,
    setEndDate,
    setLocation,
    fetchEvent,
    beforeUpload,
    handleChange,
    imageUrl,
    loading,
  } = useEvent();

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

  return (
    <Form onFinish={fetchEvent}>
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

      <Form.Item
        layout="vertical"
        label="Localização"
        name="eventLocation"
        rules={[
          {
            required: true,
            message: "Por favor, insira a localização do evento!",
          },
        ]}
      >
        <Input
          placeholder="Digite a localização do evento"
          onChange={(e) => setLocation(e.target.value)}
        />
      </Form.Item>

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
          <Button type="primary" htmlType="submit">
            Criar Evento
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CreateEvent;
