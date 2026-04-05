import { Form } from "antd";
import useListEvent from "../../hooks/event/useListEvent";
import { LoadingOutlined } from "@ant-design/icons";

const ListEvent: React.FC = () => {

    const {
        events, loading
    } = useListEvent()

  return (
    <Form 
      style={{ 
        margin: 0, 
        backgroundColor: "#dfdfdf", 
        padding: "30px", 
        borderRadius: "10px"
      }}
    >
        {!loading ? (
            <div>
                {events?.map((event: any) => (
                    <div key={event.id}>
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                    </div>
                ))}
            </div>
        ) : (
            <div 
                style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    height: "100%" 
                }}
            >
                <LoadingOutlined />
            </div>
        )}
    </Form>
  );
}

export default ListEvent;