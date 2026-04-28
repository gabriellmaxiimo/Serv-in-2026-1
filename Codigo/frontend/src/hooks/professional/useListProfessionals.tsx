import { useCallback, useEffect, useMemo, useState } from "react";
import {
  inactivateProfessional,
  listAllProfessionals,
  reactivateProfessional,
} from "../../services/professional/integration";
import { openErrorNotification } from "../../components/errorNotification";
import { openSuccessNotification } from "../../components/successNotification";
import { mockProfessionals } from "../../mocks/Professional";
import type { ProfessionalDTO } from "../../types/ProfessionalDTO";

type RawProfessional = Partial<ProfessionalDTO> & Record<string, unknown>;

const mapToProfessionalDTO = (item: RawProfessional): ProfessionalDTO => {
  const statusValue = String(item.status ?? "AVAILABLE");
  const validStatus = statusValue === "INACTIVE" ? "INACTIVE" : "AVAILABLE";

  return {
    id: String(item.id ?? ""),
    name: String(item.name ?? ""),
    cpf: String(item.cpf ?? ""),
    birthDate: String(item.birthDate ?? ""),
    email: String(item.email ?? ""),
    phone: String(item.phone ?? ""),
    area: String(item.area ?? ""),
    role: {
      id: String((item.role as { id?: unknown })?.id ?? ""),
      name: String((item.role as { name?: unknown })?.name ?? ""),
    },
    status: validStatus as "AVAILABLE" | "INACTIVE",
  };
};

const useListProfessionals = () => {
  const [professionals, setProfessionals] = useState<ProfessionalDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // Main filters
  const [filterSearch, setFilterSearch] = useState("");
  const [filterArea, setFilterArea] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  // Advanced filters
  const [filterBirthDate, setFilterBirthDate] = useState<string | null>(null);
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState("");

  const fetchProfessionals = useCallback(
    async (status?: string) => {
      setLoading(true);
      try {
        const professionalsData = await listAllProfessionals(status);
        const rawData =
          Array.isArray(professionalsData) && professionalsData.length > 0
            ? professionalsData
            : mockProfessionals;

        setProfessionals((rawData as RawProfessional[]).map(mapToProfessionalDTO));
      } catch (error: any) {
        openErrorNotification(
          "Erro ao buscar profissionais:",
          error.response?.data?.message || "Erro interno",
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Fetch professionals when status filter changes
  useEffect(() => {
    fetchProfessionals(filterStatus || undefined);
  }, [filterStatus, fetchProfessionals]);

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((professional) => {
      // Search filter (Name or CPF)
      const matchSearch =
        filterSearch === "" ||
        professional.name
          .toLowerCase()
          .includes(filterSearch.toLowerCase()) ||
        professional.cpf
          .toLowerCase()
          .includes(filterSearch.toLowerCase());

      // Area filter
      const matchArea = filterArea === "" || professional.area === filterArea;

      // Advanced filters (status is filtered by backend)
      const matchBirthDate = filterBirthDate
        ? new Date(professional.birthDate) >= new Date(filterBirthDate)
        : true;
      const matchEmail = professional.email
        .toLowerCase()
        .includes(filterEmail.toLowerCase());
      const matchPhone = professional.phone
        .toLowerCase()
        .includes(filterPhone.toLowerCase());

      return (
        matchSearch &&
        matchArea &&
        matchBirthDate &&
        matchEmail &&
        matchPhone
      );
    });
  }, [
    professionals,
    filterSearch,
    filterArea,
    filterBirthDate,
    filterEmail,
    filterPhone,
  ]);

  const inactivateProfessionalById = useCallback(
    async (professionalId: string) => {
      try {
        await inactivateProfessional(professionalId);
        openSuccessNotification("Profissional inativado com sucesso!");
        // Refetch with current filter status
        await fetchProfessionals(filterStatus || undefined);
      } catch (error: any) {
        openErrorNotification(
          "Erro ao inativar profissional:",
          error.response?.data?.message || error.response?.data || "Erro interno",
        );
      }
    },
    [filterStatus, fetchProfessionals],
  );

  const reactivateProfessionalById = useCallback(
    async (professionalId: string) => {
      try {
        await reactivateProfessional(professionalId);
        openSuccessNotification("Profissional reativado com sucesso!");
        await fetchProfessionals(filterStatus || undefined);
      } catch (error: any) {
        openErrorNotification(
          "Erro ao reativar profissional:",
          error.response?.data?.message || error.response?.data || "Erro interno",
        );
      }
    },
    [filterStatus, fetchProfessionals],
  );

  return {
    professionals: filteredProfessionals,
    loading,
    setFilterSearch,
    setFilterArea,
    setFilterStatus,
    setFilterBirthDate,
    setFilterEmail,
    setFilterPhone,
    inactivateProfessionalById,
    reactivateProfessionalById,
    refetch: () => fetchProfessionals(filterStatus || undefined),
  };
};

export default useListProfessionals;
