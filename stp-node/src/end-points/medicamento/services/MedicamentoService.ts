import { prisma } from "../../../prisma";
import { MedicamentoDTO } from "../dtos/MedicamentoDTO.dto";

class MedicamentoService {
    async create(medicamentoDTO: MedicamentoDTO) {
        try {
        const medicamento = await prisma.medicamento.create({
            data: medicamentoDTO,
        });
        return medicamento;
        } catch (error) {
        console.error(`Error creating medicamento: ${error}`);
        throw error;
        }
    }
    
    async update(id: string, medicamentoDTO: MedicamentoDTO) {
        try {
        const medicamento = await prisma.medicamento.update({
            where: { id },
            data: medicamentoDTO,
        });
        return medicamento;
        } catch (error) {
        console.error(`Error updating medicamento: ${error}`);
        throw error;
        }
    }
    
    async delete(id: string) {
        try {
        const medicamento = await prisma.medicamento.delete({
            where: { id },
        });
        return medicamento;
        } catch (error) {
        console.error(`Error deleting medicamento: ${error}`);
        throw error;
        }
    }
    
    async findById(id: string) {
        try {
        const medicamento = await prisma.medicamento.findUnique({
            where: { id },
        });
        return medicamento;
        } catch (error) {
        console.error(`Error finding medicamento by id: ${error}`);
        throw error;
        }
    }
    
    async findAll() {
        try {
        const medicamentos = await prisma.medicamento.findMany();
        return medicamentos;
        } catch (error) {
        console.error(`Error finding all medicamentos: ${error}`);
        throw error;
        }
    }
}

export { MedicamentoService };