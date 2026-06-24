import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  DatePicker,
  Form,
  Input,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import useEditEvent from "../../../hooks/event/useEditEvent";
import Search from "antd/es/input/Search";
import dayjs from "dayjs";

import * as S from "./styles";
import Button from "../../common/button/Button";

const EditEvent: React.FC = () => {
  const {
    setTitle,
    setDescription,
    setStartDate,
    setEndDate,
    setCep,
    setState,
    setCity,
    setNeighborhood,
    setStreet,
    updateEvent,
    onSearch,
    beforeUpload,
    handleChange,
    imageUrl,
    loading,
  } = useEditEvent();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const event = (location.state as { event: any })?.event;

  // Preenche o formulário com os dados vindos do EventDetailsPage
  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        eventName: event.name,
        eventDescription: event.description,
        eventDate: event.initialDate ? dayjs(event.initialDate) : null,
        eventEndDate: event.finalDate ? dayjs(event.finalDate) : null,
        eventCEP: event.cep,
        eventState: event.state,
        eventCity: event.city,
        eventNeighborhood: event.neighborhood,
        eventStreet: event.street,
      });

      setTitle(event.name);
      setDescription(event.description);
      setStartDate(event.initialDate ? dayjs(event.initialDate) : null);
      setEndDate(event.finalDate ? dayjs(event.finalDate) : null);
      setCep(event.cep);
      setState(event.state);
      setCity(event.city);
      setNeighborhood(event.neighborhood);
      setStreet(event.street);
    }
  }, [event, form, setTitle, setDescription, setStartDate, setEndDate, setCep, setState, setCity, setNeighborhood, setStreet]);

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
        eventCity: data.localidade,
        eventNeighborhood: data.bairro,
        eventStreet: data.logradouro,
      });

      setCep(data.cep);
      setState(data.uf);
      setCity(data.localidade);
      setNeighborhood(data.bairro);
      setStreet(data.logradouro);
    }
  };

  return (
    <Form
      form={form}
      onFinish={async (values) => {
        if (id) {
          // atualiza estados antes de salvar
          setTitle(values.eventName);
          setDescription(values.eventDescription);
          setStartDate(values.eventDate);
          setEndDate(values.eventEndDate);
          setCep(values.eventCEP);
          setState(values.eventState);
          setCity(values.eventCity);
          setNeighborhood(values.eventNeighborhood);
          setStreet(values.eventStreet);

          await updateEvent(id);
          navigate("/events");
        }
      }}
    >
      <Form.Item
        layout="vertical"
        label="Nome do Evento"
        name="eventName"
        rules={[{ required: true, message: "Por favor, insira o nome do evento!" }]}
      >
        <Input placeholder="Digite o nome do evento" onChange={(e) => setTitle(e.target.value)} />
      </Form.Item>

      <Form.Item layout="vertical" name="eventDescription" label="Descrição do Evento">
        <TextArea
          rows={4}
          placeholder="Digite a descrição do evento"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>

      <div style={{ display: "flex", gap: "16px" }}>
        <Form.Item layout="vertical" name="eventDate" label="Data do Evento">
          <DatePicker
            format="DD/MM/YYYY HH:mm"
            onChange={(date) => date && setStartDate(date)}
            placeholder="Data inicial"
            showTime
          />
        </Form.Item>

        <Form.Item layout="vertical" name="eventEndDate" label="Data de Encerramento">
          <DatePicker
            format="DD/MM/YYYY HH:mm"
            onChange={(date) => setEndDate(date)}
            placeholder="Data final"
            showTime
          />
        </Form.Item>
      </div>

      <S.LocationContainer>
        <Form.Item layout="vertical" label="CEP" name="eventCEP">
          <Search placeholder="CEP" onSearch={handleSearch} style={{ width: 200 }} />
        </Form.Item>
        <Form.Item layout="vertical" label="Estado" name="eventState">
          <Input style={{ width: "100%" }} onChange={(e) => setState(e.target.value)} />
        </Form.Item>
        <Form.Item layout="vertical" label="Cidade" name="eventCity">
          <Input style={{ width: "100%" }} onChange={(e) => setCity(e.target.value)} />
        </Form.Item>
        <Form.Item layout="vertical" label="Bairro" name="eventNeighborhood">
          <Input style={{ width: "100%" }} onChange={(e) => setNeighborhood(e.target.value)} />
        </Form.Item>
        <Form.Item layout="vertical" label="Logradouro" name="eventStreet">
          <Input style={{ width: "100%" }} onChange={(e) => setStreet(e.target.value)} />
        </Form.Item>
      </S.LocationContainer>

      <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
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
            onClick={() => {}} // necessário para satisfazer o tipo
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff", borderColor: "#1677ff" }}
          >
            <PlusOutlined />
            Salvar Alterações
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default EditEvent;
