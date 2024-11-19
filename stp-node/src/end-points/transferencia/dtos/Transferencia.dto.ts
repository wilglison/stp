export interface TransferenciaDTO {
    meioTransporte: string;
    destino: string;
    medicoDestino: string;
    origem: string;
    medicoOrigem: string;
    medicoRegulador: string;
    horarioSaida: Date | string;
    horarioPrevistoChegada: Date | string;
    distancia: number;
    documento: string;
    paciente: string;
    solicitacao: string;
}
