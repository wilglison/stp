import { prisma } from "../../../prisma";
import { SolicitacaoDTO } from "../dtos/SolicitacaoDTO.dto";

class SolicitacaoService {
    async create(solicitacaoDTO: SolicitacaoDTO) {
        try {
            const solicitacao = await prisma.solicitacao.create({
                data: solicitacaoDTO,
            });
            return solicitacao;
        } catch (error) {
            console.error(`Error creating solicitacao: ${error}`);
            throw error;
        }
    }

    async update(id: string, solicitacaoDTO: SolicitacaoDTO) {
        try {
            const solicitacao = await prisma.solicitacao.update({
                where: { id },
                data: solicitacaoDTO,
            });
            return solicitacao;
        } catch (error) {
            console.error(`Error updating solicitacao: ${error}`);
            throw error;
        }
    }

    async delete(id: string) {
        try {
            const solicitacao = await prisma.solicitacao.delete({
                where: { id },
            });
            return solicitacao;
        } catch (error) {
            console.error(`Error deleting solicitacao: ${error}`);
            throw error;
        }
    }

    async findById(id: string) {
        try {
            const solicitacao = await prisma.solicitacao.findUnique({
                where: { id },
            });
            return solicitacao;
        } catch (error) {
            console.error(`Error finding solicitacao by id: ${error}`);
            throw error;
        }
    }

    async findAll() {
        try {
            const solicitacoes = await prisma.solicitacao.findMany();
            return solicitacoes;
        } catch (error) {
            console.error(`Error finding all solicitacoes: ${error}`);
            throw error;
        }
    }
}

export { SolicitacaoService };