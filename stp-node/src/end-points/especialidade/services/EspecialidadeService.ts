import { prisma } from "../../../prisma";
import { EspecialidadeDTO } from "../dtos/especialidade.dto";

class EspecialidadeService {
  async create(especialidadeDTO: EspecialidadeDTO) {
    try {
      const especialidade = await prisma.especialidade.create({
        data: especialidadeDTO,
      });
      return especialidade;
    } catch (error) {
      console.error(`Error creating Especialidade: ${error}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const especialidades = await prisma.especialidade.findMany();
      return especialidades;
    } catch (error) {
      console.error(`Error getting Especialidade ${error}`);
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const especialidade = await prisma.especialidade.findUnique({
        where: { id },
      });
      return especialidade;
    } catch (error) {
      console.error(`Error finding Especialidade by id ${error}`);
      throw error;
    }
  }

  async update(id: string, especialidadeDTO: EspecialidadeDTO) {
    try {
      const especialidade = await prisma.especialidade.update({
        where: { id },
        data: especialidadeDTO,
      });
      return especialidade;
    } catch (error) {
      console.error(`Error updating Especialidade: ${error}`);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await prisma.especialidade.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(`Error delete especialidade ${error}`);
      throw error;
    }
  }
}

export { EspecialidadeService };
