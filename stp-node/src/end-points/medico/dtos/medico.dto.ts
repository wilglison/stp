export interface MedicoDTO {
  name: string;
  crm: string;
  telefone: string;
  unidadeHospitalar: string;
  papel: string;
  solicitacoes: string[];
  transferenciasOrigem: string[];
  transferenciasDestino: string[];
  transferenciasRegulador: string[];
}
