import { prisma } from "../../../prisma";
import { MedicoDTO } from "../dtos/medico.dto";

class MedicoService {
  async create(medicoDTO: MedicoDTO) {
    try {
      const medico = await prisma.medico.create({
        data: medicoDTO,
      });
      return medico;
    } catch (error) {
      console.error(`Error creating Medico: ${error}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const medicos = await prisma.medico.findMany();
      return medicos;
    } catch (error) {
      console.error(`Error getting Medicos ${error}`);
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const medico = await prisma.medico.findUnique({
        where: { id },
      });
      return medico;
    } catch (error) {
      console.error(`Error finding Medico by id ${error}`);
      throw error;
    }
  }

  async getByName(name: string) {
    try {
      const medicos = await prisma.medico.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      });
      return medicos;
    } catch (error) {
      console.error(`Error finding Medico by name ${error}`);
      throw error;
    }
  }

  async update(id: string, medicoDTO: MedicoDTO) {
    try {
      const medico = await prisma.medico.update({
        where: { id },
        data: medicoDTO,
      });
      return medico;
    } catch (error) {
      console.error(`Error updating Medico: ${error}`);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await prisma.medico.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(`Error delete Medico ${error}`);
      throw error;
    }
  }
}

export { MedicoService };
