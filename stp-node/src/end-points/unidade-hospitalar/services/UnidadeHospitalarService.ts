import { prisma } from "../../../prisma";
import { UnidadeHospitalarDTO} from "../dtos/unidade-hospitalar.dto";

class UnidadeHospitalarService {
    async create(unidadeHospitalarDTO: UnidadeHospitalarDTO) {
        try {
            const unidadeHospitalar = await prisma.unidadeHospitalar.create({
                data: unidadeHospitalarDTO,
            });
            return unidadeHospitalar;
        } catch (error) {
            console.error(`Error creating unidade hospitalar: ${error}`);
            throw error;
        }
    }

    async update(id: string, unidadeHospitalarDTO: UnidadeHospitalarDTO) {
        try {
            const unidadeHospitalar = await prisma.unidadeHospitalar.update({
                where: { id },
                data: unidadeHospitalarDTO,
            });
            return unidadeHospitalar;
        } catch (error) {
            console.error(`Error updating unidade hospitalar: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            const unidadeHospitalar = await prisma.unidadeHospitalar.delete({
                where: { id },
            });
            return unidadeHospitalar;
        } catch (error) {
            console.error(`Error deleting unidade hospitalar: ${error}`);
            throw error;
        }
    }

    async findById(id: string): Promise<UnidadeHospitalarDTO | null> {
        try {
            const unidadeHospitalar = await prisma.unidadeHospitalar.findUnique({
                where: { id },
            });
            return unidadeHospitalar;
        } catch (error) {
            console.error(`Error finding unidade hospitalar by id: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            const unidadesHospitalares = await prisma.unidadeHospitalar.findMany();
            return unidadesHospitalares;
        } catch (error) {
            console.error(`Error finding all unidades hospitalares: ${error}`);
            throw error;
        }
    }
}

export { UnidadeHospitalarService };