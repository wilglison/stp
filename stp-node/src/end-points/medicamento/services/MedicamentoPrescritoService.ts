import { prisma } from "../../../prisma";
import { MedicamentoPrescritoDTO } from "../dtos/MedicamentoPrescritoDTO.dto";

class MedicamentoPrescritoService {
  async create(medicamentoPrescritoDTO: MedicamentoPrescritoDTO) {
    try {
      const medicamentoPrescrito = await prisma.medicamentoPrescrito.create({
        data: medicamentoPrescritoDTO,
      });
      return medicamentoPrescrito;
    } catch (error) {
      console.error(`Error creating medicamento prescrito: ${error}`);
      throw error;
    }
  }

  async update(id: string, medicamentoPrescritoDTO: MedicamentoPrescritoDTO) {
    try {
      const medicamentoPrescrito = await prisma.medicamentoPrescrito.update({
        where: { id },
        data: medicamentoPrescritoDTO,
      });
      return medicamentoPrescrito;
    } catch (error) {
      console.error(`Error updating medicamento prescrito: ${error}`);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const medicamentoPrescrito = await prisma.medicamentoPrescrito.delete({
        where: { id },
      });
      return medicamentoPrescrito;
    } catch (error) {
      console.error(`Error deleting medicamento prescrito: ${error}`);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const medicamentoPrescrito = await prisma.medicamentoPrescrito.findUnique(
        {
          where: { id },
        }
      );
      return medicamentoPrescrito;
    } catch (error) {
      console.error(`Error finding medicamento prescrito by id: ${error}`);
      throw error;
    }
  }

  async findAll() {
    try {
      const medicamentosPrescritos =
        await prisma.medicamentoPrescrito.findMany();
      return medicamentosPrescritos;
    } catch (error) {
      console.error(`Error finding all medicamentos prescritos: ${error}`);
      throw error;
    }
  }
}

export { MedicamentoPrescritoService };
