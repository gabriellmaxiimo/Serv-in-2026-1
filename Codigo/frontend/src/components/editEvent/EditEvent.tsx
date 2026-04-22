import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEditEvent from "../../hooks/event/useEditEvent";
import dayjs from "dayjs";

const EditEvent: React.FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams();

  const {
    setTitle,
    setDescription,
    setStartDate,
    setEndDate,
    setLocation,
    beforeUpload,
    handleChange,
    imageUrl,
    loading,
    getEventById,
    updateEvent,
  } = useEditEvent();

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

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const event = await getEventById(id!);

        // Preenche formulário
        form.setFieldsValue({
          eventName: event.title,
          eventDescription: event.description,
          eventDate: event.startDate ? dayjs(event.startDate) : null,
          eventEndDate: event.endDate ? dayjs(event.endDate) : null,
          eventLocation: event.location,
        });

        // Atualiza estados do hook
        setTitle(event.title);
        setDescription(event.description);
        setStartDate(dayjs(event.startDate));
        setEndDate(event.endDate ? dayjs(event.endDate) : null);
        setLocation(event.location);

      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      loadEvent();
    }
  }, [id, form, getEventById, setTitle, setDescription, setStartDate, setEndDate, setLocation]);

  // 🔥 SUBMIT (UPDATE)
  const handleSubmit = async () => {
    if (!id) return;

    try {
      await updateEvent(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
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
            showTime
          />
        </Form.Item>

        <Form.Item
          layout="vertical"
          name="eventEndDate"
          label="Data de Encerramento"
        >
          <DatePicker
            format="DD/MM/YYYY HH:mm"
            onChange={(date) => setEndDate(date)}
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
            Salvar Alterações
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default EditEvent;