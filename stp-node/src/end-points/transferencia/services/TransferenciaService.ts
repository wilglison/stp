import { prisma } from "../../../prisma";
import { TransferenciaDTO } from "../dtos/Transferencia.dto";
import { UnidadeHospitalarDTO } from "../../unidade-hospitalar/dtos/unidade-hospitalar.dto";
import { UnidadeHospitalarService } from "../../unidade-hospitalar/services/UnidadeHospitalarService";

export class TransferenciaService {

  private unidadeHospitalarService: UnidadeHospitalarService;

  constructor() {
    this.unidadeHospitalarService = new UnidadeHospitalarService;
  }

    async create(transferenciaDTO: TransferenciaDTO) {
        try {
            this.validarTransferencia(transferenciaDTO);
            await this.calcularDistancia(transferenciaDTO);
            transferenciaDTO.horarioSaida = new Date(transferenciaDTO.horarioSaida);
            this.calcularHorarioPrevistoChegada(transferenciaDTO, transferenciaDTO.meioTransporte as MeioTransporte);
            const transferencia = await prisma.transferencia.create({
                data: transferenciaDTO,
            });
            return transferencia;
        } catch (error) {
            console.error(`Error creating transferencia: ${error}`);
            throw error;
        }
    }

    async update(id: string, transferenciaDTO: TransferenciaDTO) {
        try {
            this.validarTransferencia(transferenciaDTO);
            await this.calcularDistancia(transferenciaDTO);
            transferenciaDTO.horarioSaida = new Date(transferenciaDTO.horarioSaida);
            this.calcularHorarioPrevistoChegada(transferenciaDTO, transferenciaDTO.meioTransporte as MeioTransporte);
            const transferencia = await prisma.transferencia.update({
                where: { id },
                data: transferenciaDTO,
            });
            return transferencia;
        } catch (error) {
            console.error(`Error updating transferencia: ${error}`);
            throw error;
        }
    }
    async delete(id: string) {
        try {
            const transferencia = await prisma.transferencia.delete({
                where: { id },
            });
            return transferencia;
        } catch (error) {
            console.error(`Error deleting transferencia: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            const transferencia = await prisma.transferencia.findUnique({
                where: { id },
            });
            return transferencia;
        } catch (error) {
            console.error(`Error finding transferencia by id: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            const transferencias = await prisma.transferencia.findMany();
            return transferencias;
        } catch (error) {
            console.error(`Error finding all transferencias: ${error}`);
            throw error;
        }
    }

    validarTransferencia(transferencia: TransferenciaDTO): void {
      if (!transferencia) {
        throw new Error("O Campo transferência é obrigatório!");
      }
      if (!transferencia.paciente) {
        throw new Error("O Campo paciente é obrigatório!");
      }
      if (!transferencia.origem) {
        throw new Error("O Campo hospital de origem é obrigatório!");
      }
      if (!transferencia.destino) {
        throw new Error("O Campo hospital de destino é obrigatório!");
      }
      if (!transferencia.horarioSaida) {
        throw new Error("O Campo horário de saída é obrigatório!");
      }
      if (!transferencia.meioTransporte) {
        throw new Error("O Campo meio de transporte é obrigatório!");
      }
      if (!transferencia.medicoOrigem) {
        throw new Error("O Campo médico de origem é obrigatório!");
      }
      if (!transferencia.documento) {
        throw new Error("O Campo documento de transferência é obrigatório!");
      }
    }

    calcularHorarioPrevistoChegada(transferencia: TransferenciaDTO, meioTransporte: MeioTransporte): void {
      const velocidadeMedia = this.getVelocidadeMedia(meioTransporte);
      if (typeof velocidadeMedia === 'undefined') {
        throw new Error('Meio de transporte inválido ou sem velocidade média definida');
      }
      const distancia = transferencia.distancia;
      const tempoEmHoras = distancia / velocidadeMedia;
      const tempoEmMillis = tempoEmHoras * 60 * 60 * 1000;
      
      // Ensure horarioSaida is a Date object
      const horarioSaida = transferencia.horarioSaida instanceof Date 
        ? transferencia.horarioSaida 
        : new Date(transferencia.horarioSaida);
      
      const horarioPrevistoChegada = new Date(horarioSaida.getTime() + tempoEmMillis);
      transferencia.horarioPrevistoChegada = horarioPrevistoChegada;
    }
    

    async calcularDistancia(transferencia: TransferenciaDTO): Promise<void> {
      const origem = await this.unidadeHospitalarService.findById(transferencia.origem);
      const destino = await this.unidadeHospitalarService.findById(transferencia.destino);
      
      if (!origem || !destino) {
        throw new Error("Origem or destino not found");
      }
      
      const distancia = this.calcularDistanciaEntreUnidades(origem, destino);
      transferencia.distancia = distancia;
    }

    private calcularDistanciaEntreUnidades(origem: UnidadeHospitalarDTO, destino: UnidadeHospitalarDTO): number {
      const EARTH_RADIUS = 6371; // Earth's radius in kilometers

      const lat1 = this.toRadians(origem.latitude);
      const lon1 = this.toRadians(origem.longitude);
      const lat2 = this.toRadians(destino.latitude);
      const lon2 = this.toRadians(destino.longitude);

      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return EARTH_RADIUS * c;
    }

    private toRadians(degrees: number): number {
      return degrees * (Math.PI / 180);
    }

    private getVelocidadeMedia(meioTransporte: MeioTransporte): number {
      return meioTransporteInfo[meioTransporte].velocidadeMedia;
    }
}

export enum MeioTransporte {
  AMBULANCIA = 'AMBULANCIA',
  HELICOPTERO = 'HELICOPTERO',
  AVIAO = 'AVIAO',
  EVTOL = 'EVTOL'
}

interface MeioTransporteInfo {
  velocidadeMedia: number;
}

const meioTransporteInfo: { [key in MeioTransporte]: MeioTransporteInfo } = {
  [MeioTransporte.AMBULANCIA]: { velocidadeMedia: 80.0 },
  [MeioTransporte.HELICOPTERO]: { velocidadeMedia: 200.0 },
  [MeioTransporte.AVIAO]: { velocidadeMedia: 800.0 },
  [MeioTransporte.EVTOL]: { velocidadeMedia: 150.0 }
};