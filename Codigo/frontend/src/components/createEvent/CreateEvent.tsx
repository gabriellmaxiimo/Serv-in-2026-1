import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import useEvent from '../../hooks/event/useEvent';

const CreateEvent: React.FC = () => {

  const {
    setTitle,
    setDescription,
    setStartDate,
    setEndDate,
    setLocation,
    setImageUrl,
    fetchEvent
  } = useEvent()

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form 
      onFinish={fetchEvent} 
      style={{ 
        margin: 0, 
        backgroundColor: "#dfdfdf", 
        padding: "30px", 
        borderRadius: "10px"
      }}
    >
      <Form.Item 
        layout="vertical" 
        label="Nome do Evento" 
        name="eventName" 
        rules={[{ required: true, message: 'Por favor, insira o nome do evento!' }]}
      >
        <Input 
          placeholder='Digite o nome do evento'
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>

      <Form.Item 
        layout="vertical" 
        name="eventDescription" 
        label="Descrição do Evento"
        rules={[{ required: false, message: 'Por favor, insira a descrição do evento!' }]}
      >
        <TextArea 
          rows={4} 
          placeholder='Digite a descrição do evento'
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Item>

      <div style={{ display: 'flex', gap: '16px' }}>
        <Form.Item 
          layout="vertical" 
          name="eventDate" 
          label="Data do Evento"
          rules={[{ required: true, message: 'Por favor, selecione a data do evento!' }]}
        >
          <DatePicker 
            format="DD/MM/YYYY" 
            onChange={(date) => date && setStartDate(date)}
            placeholder='Data inicial'
          />
        </Form.Item>

        <Form.Item 
          layout="vertical" 
          name="eventEndDate" 
          label="Data de Encerramento"
          rules={[{ 
            required: false, 
            message: 'Por favor, selecione a data de encerramento!' 
          }]}
        >
          <DatePicker 
            format="DD/MM/YYYY" 
            onChange={(date) => setEndDate(date)}
            placeholder='Data final'
          />
            
        </Form.Item>
      </div>

      <Form.Item 
        layout="vertical" 
        label="Localização" 
        name="eventLocation" 
        rules={[{ 
          required: true, 
          message: 'Por favor, insira a localização do evento!' 
        }]}
      >
        <Input 
          placeholder='Digite a localização do evento'
          onChange={(e) => setLocation(e.target.value)}
        />
      </Form.Item>

      <Form.Item 
        label="Upload" 
        valuePropName="fileList" 
        getValueFromEvent={normFile}
      >
        <Upload 
          action="/upload.do" 
          listType="picture-card" 
          onChange={((value) => setImageUrl(value))}
        >
          <button
            style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
            type="button"
          >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>
              Upload
            </div>
          </button>
        </Upload>
      </Form.Item>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
          >
            Criar Evento
          </Button>
        </Form.Item>
      </div>

    </Form>
  );
}

export default CreateEvent;