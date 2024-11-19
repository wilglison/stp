import { prisma } from "../../../prisma";
import { EnderecoDTO } from "../dtos/endereco.dto";

class EnderecoService {
  async create(enderecoDTO: EnderecoDTO) {
    try {
      const endereco = await prisma.endereco.create({
        data: enderecoDTO,
      });
      return endereco;
    } catch (error) {
      console.error(`Error create endereco: ${error}`);
      throw error;
    }
  }

  async getAll() {
    try {
      const enderecos = await prisma.endereco.findMany();
      return enderecos;
    } catch (error) {
      console.error(`Error getting enderecos ${error}`);
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const endereco = await prisma.endereco.findUnique({
        where: { id },
      });
      return endereco;
    } catch (error) {
      console.error(`Error finding endereco by id ${error}`);
      throw error;
    }
  }

  async update(id: string, enderecoDTO: EnderecoDTO) {
    try {
      const endereco = await prisma.endereco.update({
        where: { id },
        data: enderecoDTO,
      });
      return endereco;
    } catch (error) {
      console.error(`Error updating endereco: ${error}`);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await prisma.endereco.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(`Error delete endereco ${error}`);
      throw error;
    }
  }
}

export { EnderecoService };
