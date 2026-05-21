import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
	Button,
	DatePicker,
	Descriptions,
	Dropdown,
	Empty,
	Input,
	Modal,
	Select,
	Table,
	Tag,
	type MenuProps,
	Card,
	Space,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
	CloseCircleFilled,
	CheckCircleOutlined,
	StopOutlined,
	EditOutlined,
	EyeFilled,
	MoreOutlined,
} from "@ant-design/icons";
import useListProfessionals from "../../../hooks/professional/useListProfessionals";
import type { ProfessionalDTO } from "../../../types/ProfessionalDTO";
import { inviteProfessional } from "../../../services/eventProfessional/integration";
import { listEventProfessionals } from "../../../services/eventProfessional/integration";
import { openSuccessNotification } from "../../successNotification";
import { openErrorNotification } from "../../errorNotification";
import { setInviteNotification } from "../../common/globalNotification/inviteNotificationStore";

type ListProfessionalsProps = {
	emptyDescription?: string;
};

type MenuClickInfo = Parameters<NonNullable<MenuProps["onClick"]>>[0];

const ListProfessionals = ({
	emptyDescription = "Nenhum profissional encontrado",
}: ListProfessionalsProps) => {
	const navigate = useNavigate();
	const {
		professionals,
		loading,
		setFilterSearch,
		setFilterArea,
		setFilterStatus,
		setFilterBirthDate,
		setFilterEmail,
		setFilterPhone,
		inactivateProfessionalById,
		reactivateProfessionalById,
	} = useListProfessionals();

	const [selectedProfessional] = useState<ProfessionalDTO | null>(null);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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

	const statusLabelMap: Record<string, { label: string; color: string }> = {
		AVAILABLE: { label: "Disponível", color: "green" },
		INACTIVE: { label: "Inativo", color: "red" },
	};

	const areaOptions = Object.entries(areaLabelMap).map(([key, value]) => ({
		label: value,
		value: key,
	}));

	const statusOptions = Object.entries(statusLabelMap).map(([key, value]) => ({
		label: value.label,
		value: key,
	}));


	// build base columns
	const baseColumns: ColumnsType<ProfessionalDTO> = [
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
	 			title: "Status",
	 			dataIndex: "status",
	 			key: "status",
	 			render: (status: string) => {
	 				const statusInfo = statusLabelMap[status];
	 				return (
	 					<Tag color={statusInfo.color}>
	 						{statusInfo.label}
	 					</Tag>
	 				);
	 			},
	 		},
	 		{
	 			title: "Ação",
	 			dataIndex: "actionButton",
	 			key: "actionButton",
	 				render: (_: unknown, record: ProfessionalDTO) => {
	 					const actionItem: NonNullable<MenuProps["items"]>[number] =
	 					record.status === "INACTIVE"
	 						? {
	 							key: "reactivate",
	 							label: <span style={{ color: "green" }}>Reativar</span>,
	 							icon: <CheckCircleOutlined style={{ color: "green" }} />,
	 								onClick: (e: MenuClickInfo) => {
	 								e.domEvent.stopPropagation();
	 								confirm({
	 									title: "Você deseja reativar este profissional?",
	 									icon: <CheckCircleOutlined style={{ color: "green" }} />,
	 									content: `O profissional "${record.name}" será reativado.`,
	 									okText: "Sim, reativar",
	 									cancelText: "Não",
	 									onOk() {
	 										reactivateProfessionalById(record.id);
	 									},
	 								});
	 							},
	 						}
	 						: {
	 							key: "inactivate",
	 							label: <span style={{ color: "red" }}>Inativar</span>,
	 							icon: <StopOutlined style={{ color: "red" }} />,
	 							onClick: (e: MenuClickInfo) => {
	 								e.domEvent.stopPropagation();
	 								confirm({
	 									title: "Você deseja inativar este profissional?",
	 									icon: <CloseCircleFilled />,
	 									content: `O profissional "${record.name}" será inativado.`,
	 									okText: "Sim, inativar",
	 									okType: "danger",
	 									cancelText: "Não",
	 									onOk() {
	 										inactivateProfessionalById(record.id);
	 									},
	 								});
	 							},
	 						};

	 				const items: MenuProps["items"] = [
	 					{
	 						key: "view",
	 						label: "Visualizar",
	 						icon: <EyeFilled />,
	 						onClick: (e) => {
	 							e.domEvent.stopPropagation();
	 							navigate(`/professional/${record.id}`, {
									state: { from: "professional-list" },
								});
	 						},
	 					},
	 					{
	 						key: "edit",
	 						label: "Editar",
	 						icon: <EditOutlined />,
	 						onClick: (e) => {
	 							e.domEvent.stopPropagation();
	 							Modal.info({
	 								title: "Edição de profissional",
	 								content: "Fluxo de edição ainda não implementado para profissionais.",
	 							});
	 						},
	 					},
	 					actionItem,
	 				];

	 				return (
	 					<Dropdown menu={{ items }} trigger={["click"]}>
	 						<Button type="text" icon={<MoreOutlined />} onClick={(e) => e.stopPropagation()} />
	 					</Dropdown>
	 				);
	 			},
	 		},
	];

	const location = useLocation();
	const locationState = (location.state as any) ?? null;
	const showEventActions = Boolean(locationState?.from === "event-details" && locationState?.eventId);

	const [linkedProfessionalIds, setLinkedProfessionalIds] = useState<Set<string>>(new Set());
	const [invitingIds, setInvitingIds] = useState<Set<string>>(new Set());

	// Carregar profissionais vinculados quando entrar da página de evento
	useEffect(() => {
		const loadLinked = async () => {
			if (!showEventActions || !locationState?.eventId) return;
			try {
				const resp = await listEventProfessionals(locationState.eventId);
				const list = Array.isArray(resp.data) ? resp.data : [];
				const ids = new Set(list.map((lp: any) => String(lp.professionalId)));
				setLinkedProfessionalIds(ids);
			} catch {
				setLinkedProfessionalIds(new Set());
			}
		};

		loadLinked();
	}, [showEventActions, locationState?.eventId]);

	const handleAddToEvent = async (professionalId: string, professionalName: string) => {
		if (!locationState?.eventId) return;

		setInvitingIds((prev) => new Set(prev).add(professionalId));

		try {
			const response = await inviteProfessional(locationState.eventId, professionalId);
			const { message, emailSent, emailQueued } = response.data;

			const showInviteSuccessBanner = (bannerTitle: string, bannerDescription: string) => {
				setInviteNotification({
					title: bannerTitle,
					description: bannerDescription,
				});
			};

			if (emailSent) {
				showInviteSuccessBanner(
					"Convite enviado com sucesso",
					`${professionalName} foi convidado para o evento e a mensagem foi enviada.`
				);
				openSuccessNotification(message || `${professionalName} convidado para o evento com sucesso.`);
			} else if (emailQueued) {
				showInviteSuccessBanner("Convite criado", "O e-mail foi enfileirado para envio.");
				openSuccessNotification(message || `Convite criado — e-mail será enviado em segundo plano.`);
			} else {
				openErrorNotification(
					message || "Convite criado, mas o e-mail não pôde ser enviado ou enfileirado. Entre em contato com o profissional."
				);
			}
			// Atualizar estado local
			setLinkedProfessionalIds((prev) => new Set(prev).add(professionalId));
		} catch (err) {
			const errorMessage =
				(err as any)?.response?.data?.message ||
				(err as any)?.response?.data ||
				"Erro ao convidar profissional para o evento";

			openErrorNotification(errorMessage, "Verifique o e-mail do profissional ou tente novamente.");
		} finally {
			setInvitingIds((prev) => {
				const next = new Set(prev);
				next.delete(professionalId);
				return next;
			});
		}
	};

	// final columns: insert event-action column at start when appropriate
	const columns: ColumnsType<ProfessionalDTO> = showEventActions
		? [
			{
				title: "Ações",
				dataIndex: "addToEvent",
				key: "addToEvent",
				render: (_: unknown, record: ProfessionalDTO) => {
					const isLinked = linkedProfessionalIds.has(record.id);
					const isInviting = invitingIds.has(record.id);

					return (
						<Button
							type={isLinked ? "default" : "primary"}
							size="small"
							disabled={isLinked}
							loading={isInviting}
							style={{
								backgroundColor: isLinked ? "#d9d9d9" : undefined,
								color: isLinked ? "#999" : undefined,
							}}
							onClick={(e) => {
								e.stopPropagation();
								if (!isLinked) {
									handleAddToEvent(record.id, record.name);
								}
							}}
						>
							{isLinked ? "Vinculado" : "Adicionar"}
						</Button>
					);
				},
			},
			...baseColumns,
		]
		: baseColumns;

	const handleRowClick = (record: ProfessionalDTO) => {
		// Navigate to professional detail page
		navigate(`/professional/${record.id}`, {
			state: { from: "professional-list" },
		});
	};

	return (
		<>
			<Card
			style={{
				marginBottom: 20,
				borderRadius: 12,
			}}
			bodyStyle={{ padding: 16 }}
			>
			<Space wrap style={{ width: "100%" }}>
				<Input
				style={{ width: 260 }}
				placeholder="Buscar por nome ou CPF"
				onChange={(e) => setFilterSearch(e.target.value)}
				/>

				<Select
				style={{ width: 200 }}
				placeholder="Área"
				allowClear
				onChange={(value) => setFilterArea(value || "")}
				options={areaOptions}
				/>

				<Select
				style={{ width: 200 }}
				placeholder="Status"
				allowClear
				onChange={(value) => setFilterStatus(value || "")}
				options={statusOptions}
				/>

				<DatePicker
				style={{ width: 200 }}
				placeholder="Data de nascimento"
				onChange={(date) =>
					setFilterBirthDate(date ? date.toISOString() : null)
				}
				format="DD/MM/YYYY"
				/>

				<Input
				style={{ width: 220 }}
				placeholder="E-mail"
				onChange={(e) => setFilterEmail(e.target.value)}
				/>

				<Input
				style={{ width: 200 }}
				placeholder="Telefone"
				onChange={(e) => setFilterPhone(e.target.value)}
				/>
			</Space>
			</Card>

			<Table
				columns={columns}
				dataSource={professionals}
				loading={loading}
				rowKey="id"
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
					style: { cursor: "pointer" },
				})}
				locale={{ emptyText: <Empty description={emptyDescription} /> }}
			/>

			<Modal
				title="Detalhes do Profissional"
				open={isViewModalOpen}
				onCancel={() => setIsViewModalOpen(false)}
				footer={null}
			>
				{selectedProfessional && (
					<Descriptions column={1} bordered>
						<Descriptions.Item label="Nome">
							{selectedProfessional.name}
						</Descriptions.Item>
						<Descriptions.Item label="CPF">
							{selectedProfessional.cpf.replace(
								/(\d{3})(\d{3})(\d{3})(\d{2})/,
								"$1.$2.$3-$4",
							)}
						</Descriptions.Item>
						<Descriptions.Item label="Data de Nascimento">
							{selectedProfessional.birthDate
								? new Date(selectedProfessional.birthDate).toLocaleDateString("pt-BR")
								: "-"}
						</Descriptions.Item>
						<Descriptions.Item label="E-mail">
							{selectedProfessional.email}
						</Descriptions.Item>
						<Descriptions.Item label="Telefone">
							{selectedProfessional.phone.replace(
								/(\d{2})(\d{5})(\d{4})/,
								"($1) $2-$3",
							)}
						</Descriptions.Item>
						<Descriptions.Item label="Cargo">
							{selectedProfessional.role?.name || "-"}
						</Descriptions.Item>
						<Descriptions.Item label="Área">
							{areaLabelMap[selectedProfessional.area] || selectedProfessional.area || "-"}
						</Descriptions.Item>
						<Descriptions.Item label="Status">
							<Tag color={statusLabelMap[selectedProfessional.status].color}>
								{statusLabelMap[selectedProfessional.status].label}
							</Tag>
						</Descriptions.Item>
					</Descriptions>
				)}
			</Modal>
		</>
	);
};

export default ListProfessionals;
