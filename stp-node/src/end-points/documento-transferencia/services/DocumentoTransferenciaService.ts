import { prisma } from "../../../prisma";
import { DocumentoTransferenciaDTO } from "../dtos/DocumentoTransferenciaDTO.dto";

class DocumentoTransferenciaService {
  async create(documentoTransferenciaDTO: DocumentoTransferenciaDTO) {
    try {
      const documentoTransferencia = await prisma.documentoTransferencia.create({
        data: documentoTransferenciaDTO,
      });
      return documentoTransferencia;
    } catch (error) {
      console.error(`Error creating documento transferencia: ${error}`);
      throw error;
    }
  }

  async update(id: string, documentoTransferenciaDTO: DocumentoTransferenciaDTO) {
    try {
      const documentoTransferencia = await prisma.documentoTransferencia.update({
        where: { id },
        data: documentoTransferenciaDTO,
      });
      return documentoTransferencia;
    } catch (error) {
      console.error(`Error updating documento transferencia: ${error}`);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const documentoTransferencia = await prisma.documentoTransferencia.delete({
        where: { id },
      });
      return documentoTransferencia;
    } catch (error) {
      console.error(`Error deleting documento transferencia: ${error}`);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const documentoTransferencia = await prisma.documentoTransferencia.findUnique({
        where: { id },
      });
      return documentoTransferencia;
    } catch (error) {
      console.error(`Error finding documento transferencia by id: ${error}`);
      throw error;
    }
  }

  async findAll() {
    try {
      const documentosTransferencia = await prisma.documentoTransferencia.findMany();
      return documentosTransferencia;
    } catch (error) {
      console.error(`Error finding all documentos transferencia: ${error}`);
      throw error;
    }
  }
}

export { DocumentoTransferenciaService };