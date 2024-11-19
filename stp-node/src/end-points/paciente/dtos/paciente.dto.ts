export interface PacienteDTO {
  cpf: string;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  tipoSanguineo: string;
  prontuario: string;
  solicitacoes: string[];
  transferencias: string[];
}
