import type {iEmployee} from '../hooks/employees/useListEmployees'

export const mockEmployee: iEmployee[] = [
  { id: "1", name: 'Pedro Vieira', cpf: "12345678900", birthDate: "2024-10-10", email: "pedro.vieira@email.com", phone: "31999999999", role: 'Coordernador de eventos' },
  { id: "2", name: 'Italo Vinhas', cpf: "12345678800", birthDate: "2006-03-05", email: "italo.vinhas@email.com", phone: "31999999998", role: 'Diretor Médico' },
  { id: "3", name: 'Iago', cpf: "12345678700", birthDate: "2004-08-20", email: "iago.delara@email.com", phone: "31999999997", role: 'Coordenador de segurança operacional' },
  { id: "4", name: 'Luan', cpf: "12345678600", birthDate: "2003-05-13", email: "luann@email.com", phone: "31999999996", role: 'Chef executivo' },
];

