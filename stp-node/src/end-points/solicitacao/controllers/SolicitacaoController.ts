import { Request, Response } from 'express';
import { handleError, validateId } from '../../../utils/utils';
import { SolicitacaoDTO } from '../dtos/SolicitacaoDTO.dto';
import { SolicitacaoService } from '../services/SolicitacaoService';

class SolicitacaoController {
    private solicitacaoService: SolicitacaoService;

    constructor() {
        this.solicitacaoService = new SolicitacaoService();
    }

    async create(req: Request, res: Response) {
        try {
            const solicitacaoDTO: SolicitacaoDTO = req.body;
            const result = await this.solicitacaoService.create(solicitacaoDTO);
            return res.status(201).json(result);
        } catch (error) {
            return handleError(res, error, 'Error creating solicitacao');
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            const solicitacaoDTO: SolicitacaoDTO = req.body;
            const result = await this.solicitacaoService.update(id, solicitacaoDTO);
            return res.status(200).json(result);
        } catch (error) {
            return handleError(res, error, 'Error updating solicitacao');
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            validateId(id, res);
            await this.solicitacaoService.delete(id);
            return res.status(204).send();
        } catch (error) {
            return handleError(res, error, 'Error deleting solicitacao');
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id: string = req.params.id;
            validateId(id, res);
            const result = await this.solicitacaoService.findById(id);
            return res.status(200).json(result);
        } catch (error) {
            return handleError(res, error, 'Error getting solicitacao by id');
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const result = await this.solicitacaoService.findAll();
            return res.status(200).json(result);
        } catch (error) {
            return handleError(res, error, 'Error getting solicitacoes');
        }
    }
}

export { SolicitacaoController };