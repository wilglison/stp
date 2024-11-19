import { prisma } from "../../../prisma";
import { ProntuarioDTO } from "../dtos/prontuario.dto";

class ProntuarioService {
  async create(prontuarioDTO: ProntuarioDTO) {
    try {
      const prontuario = await prisma.prontuario.create({
        data: prontuarioDTO,
      });
      return prontuario;
    } catch (error) {
      console.error(`Error creating Prontuario: ${error}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const prontuarios = await prisma.prontuario.findMany();
      return prontuarios;
    } catch (error) {
      console.error(`Error getting Prontuario ${error}`);
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const prontuario = await prisma.prontuario.findUnique({
        where: { id },
      });
      return prontuario;
    } catch (error) {
      console.error(`Error finding Prontuario by id ${error}`);
      throw error;
    }
  }

  async update(id: string, prontuarioDTO: ProntuarioDTO) {
    try {
      const prontuario = await prisma.prontuario.update({
        where: { id },
        data: prontuarioDTO,
      });
      return prontuario;
    } catch (error) {
      console.error(`Error updating Prontuario: ${error}`);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await prisma.prontuario.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(`Error delete Prontuario ${error}`);
      throw error;
    }
  }
}

export { ProntuarioService };
