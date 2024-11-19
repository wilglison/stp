export interface UnidadeHospitalarDTO {
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  dadosPessoal: string;
  latitude: number;
  longitude: number;
  disponibilidadeLeitos: string;
  especialidades: string[];
  medicos: string[];
  temUTI: boolean;
}
