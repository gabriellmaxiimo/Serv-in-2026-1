import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Alert,
	Button,
	Empty,
	Input,
	Modal,
	Select,
	Skeleton,
	Table,
	Tag,
	Tabs,
	Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
	CloseCircleFilled,
	DeleteOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
import {
	inviteProfessional,
	listEventProfessionals,
	removeProfessional,
} from "../../../services/eventProfessional/integration";
import { listAllProfessionals } from "../../../services/professional/integration";
import type { EventProfessionalDTO } from "../../../types/EventProfessionalDTO";
import type { ProfessionalDTO } from "../../../types/ProfessionalDTO";
import { openSuccessNotification } from "../../successNotification";
import { openErrorNotification } from "../../errorNotification";

const { Title } = Typography;
const { confirm } = Modal;

const areaLabelMap: Record<string, string> = {
	MEDICINE: "Medicina",
	SECURITY: "Segurança",
	FOOD_SERVICE: "Alimentação",
	BEVERAGES: "Bebidas",
	CLEANING: "Limpeza",
	LOGISTICS: "Logística",
	STAFF: "Staff",
	RECEPTION: "Recepção",
	TECHNOLOGY: "Tecnologia",
};

const inviteStatusLabelMap: Record<
	EventProfessionalDTO["status"],
	{ label: string; color: string }
> = {
	PENDING_CONFIRMATION: { label: "Pendente", color: "gold" },
	CONFIRMED: { label: "Confirmado", color: "green" },
	REJECTED: { label: "Recusado", color: "red" },
	CANCELED: { label: "Cancelado", color: "default" },
};

const areaOptions = Object.entries(areaLabelMap).map(([key, value]) => ({
	label: value,
	value: key,
}));

type EventProfessionalsProps = {
	eventId: string;
	eventName?: string;
};

const EventProfessionals = ({ eventId, eventName }: EventProfessionalsProps) => {
	const navigate = useNavigate();

	const [eventProfessionals, setEventProfessionals] = useState<EventProfessionalDTO[]>([]);
	const [allProfessionals, setAllProfessionals] = useState<ProfessionalDTO[]>([]);
	const [loadingEventProfs, setLoadingEventProfs] = useState(true);
	const [loadingAllProfs, setLoadingAllProfs] = useState(true);
	const [inviting, setInviting] = useState<string | null>(null);
	const [removing, setRemoving] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [searchText, setSearchText] = useState("");
	const [filterArea, setFilterArea] = useState("");

	const fetchEventProfessionals = useCallback(async () => {
		setLoadingEventProfs(true);
		try {
			const response = await listEventProfessionals(eventId);
			setEventProfessionals(Array.isArray(response.data) ? response.data : []);
		} catch (err: any) {
			setError(
				err?.response?.data?.message ||
					"Erro ao carregar profissionais do evento.",
			);
		} finally {
			setLoadingEventProfs(false);
		}
	}, [eventId]);

	const fetchAllProfessionals = useCallback(async () => {
		setLoadingAllProfs(true);
		try {
			const data = await listAllProfessionals();
			setAllProfessionals(Array.isArray(data) ? data : []);
		} catch (err: any) {
			openErrorNotification(
				"Erro ao carregar profissionais",
				err?.response?.data?.message || "Erro interno",
			);
		} finally {
			setLoadingAllProfs(false);
		}
	}, []);

	useEffect(() => {
		fetchEventProfessionals();
		fetchAllProfessionals();
	}, [fetchEventProfessionals, fetchAllProfessionals]);

	const handleInvite = async (professionalId: string, professionalName: string) => {
		setInviting(professionalId);
		try {
			await inviteProfessional(eventId, professionalId);
			openSuccessNotification(`${professionalName} convidado com sucesso!`);
			await fetchEventProfessionals();
		} catch (err: any) {
			openErrorNotification(
				"Erro ao convidar profissional",
				err?.response?.data || "Erro interno",
			);
		} finally {
			setInviting(null);
		}
	};

	const handleRemove = (professionalId: string, professionalName: string) => {
		confirm({
			title: "Remover profissional do evento?",
			icon: <CloseCircleFilled />,
			content: `O profissional "${professionalName}" será removido deste evento.`,
			okText: "Sim, remover",
			okType: "danger",
			cancelText: "Cancelar",
			onOk: async () => {
				setRemoving(professionalId);
				try {
					await removeProfessional(eventId, professionalId);
					openSuccessNotification(`${professionalName} removido do evento.`);
					await fetchEventProfessionals();
				} catch (err: any) {
					openErrorNotification(
						"Erro ao remover profissional",
						err?.response?.data || "Erro interno",
					);
				} finally {
					setRemoving(null);
				}
			},
		});
	};

	const invitedProfessionalIds = new Set(
		eventProfessionals.map((ep) => ep.professionalId),
	);

	const filteredProfessionals = allProfessionals.filter((p) => {
		const matchSearch =
			searchText === "" ||
			p.name.toLowerCase().includes(searchText.toLowerCase()) ||
			p.cpf.includes(searchText);
		const matchArea = filterArea === "" || p.area === filterArea;
		return matchSearch && matchArea && p.status === "AVAILABLE";
	});

	const eventProfessionalsColumns: ColumnsType<EventProfessionalDTO> = [
		{
			title: "Nome",
			dataIndex: "professionalName",
			key: "professionalName",
			render: (name: string) => <strong>{name}</strong>,
		},
		{
			title: "Status do Convite",
			dataIndex: "status",
			key: "status",
			render: (status: EventProfessionalDTO["status"]) => {
				const info = inviteStatusLabelMap[status] || {
					label: status,
					color: "default",
				};
				return <Tag color={info.color}>{info.label}</Tag>;
			},
		},
		{
			title: "Convidado em",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (date: string) =>
				new Date(date).toLocaleDateString("pt-BR"),
		},
		{
			title: "Ação",
			key: "action",
			render: (_: unknown, record: EventProfessionalDTO) => (
				<Button
					danger
					icon={<DeleteOutlined />}
					loading={removing === record.professionalId}
					onClick={() =>
						handleRemove(record.professionalId, record.professionalName)
					}
				>
					Remover
				</Button>
			),
		},
	];

	const allProfessionalsColumns: ColumnsType<ProfessionalDTO> = [
		{
			title: "Nome",
			dataIndex: "name",
			key: "name",
			render: (text: string) => <strong>{text}</strong>,
		},
		{
			title: "CPF",
			dataIndex: "cpf",
			key: "cpf",
			render: (cpf: string) =>
				cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
		},
		{
			title: "Cargo",
			dataIndex: "role",
			key: "role",
			render: (role: ProfessionalDTO["role"]) => role?.name || "-",
		},
		{
			title: "Área",
			dataIndex: "area",
			key: "area",
			render: (area: string) => areaLabelMap[area] || area || "-",
		},
		{
			title: "Ação",
			key: "action",
			render: (_: unknown, record: ProfessionalDTO) => {
				const alreadyInvited = invitedProfessionalIds.has(record.id);
				if (alreadyInvited) {
					const ep = eventProfessionals.find(
						(e) => e.professionalId === record.id,
					);
					const statusInfo = ep
						? inviteStatusLabelMap[ep.status] || {
								label: ep.status,
								color: "default",
							}
						: null;
					return statusInfo ? (
						<Tag color={statusInfo.color}>{statusInfo.label}</Tag>
					) : (
						<Tag>Convidado</Tag>
					);
				}
				return (
					<Button
						type="primary"
						icon={<UserAddOutlined />}
						loading={inviting === record.id}
						onClick={() => handleInvite(record.id, record.name)}
					>
						Convidar
					</Button>
				);
			},
		},
	];

	if (error) {
		return (
			<Alert
				type="error"
				showIcon
				message="Erro ao carregar dados"
				description={error}
			/>
		);
	}

	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 16,
				}}
			>
				<Title level={4} style={{ margin: 0 }}>
					{eventName
						? `Profissionais: ${eventName}`
						: "Profissionais do Evento"}
				</Title>
				<Button onClick={() => navigate("/events")}>
					Voltar para eventos
				</Button>
			</div>

			<Tabs
				defaultActiveKey="associated"
				items={[
					{
						key: "associated",
						label: `Profissionais Associados (${eventProfessionals.length})`,
						children: loadingEventProfs ? (
							<Skeleton active paragraph={{ rows: 4 }} />
						) : (
							<Table
								columns={eventProfessionalsColumns}
								dataSource={eventProfessionals}
								rowKey="id"
								locale={{
									emptyText: (
										<Empty description="Nenhum profissional associado a este evento" />
									),
								}}
							/>
						),
					},
					{
						key: "add",
						label: "Adicionar Profissional",
						children: (
							<>
								<div
									style={{
										display: "flex",
										gap: 10,
										marginBottom: 16,
										flexWrap: "wrap",
									}}
								>
									<Input
										style={{ flex: "1 1 200px", minWidth: "150px" }}
										placeholder="Buscar por Nome ou CPF"
										onChange={(e) => setSearchText(e.target.value)}
									/>
									<Select
										style={{ flex: "1 1 180px", minWidth: "150px" }}
										placeholder="Área"
										allowClear
										onChange={(value) => setFilterArea(value || "")}
										options={areaOptions}
									/>
								</div>
								{loadingAllProfs ? (
									<Skeleton active paragraph={{ rows: 4 }} />
								) : (
									<Table
										columns={allProfessionalsColumns}
										dataSource={filteredProfessionals}
										rowKey="id"
										locale={{
											emptyText: (
												<Empty description="Nenhum profissional disponível encontrado" />
											),
										}}
									/>
								)}
							</>
						),
					},
				]}
			/>
		</div>
	);
};

export default EventProfessionals;
