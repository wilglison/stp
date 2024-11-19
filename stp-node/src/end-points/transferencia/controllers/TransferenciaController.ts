import { Request, Response, NextFunction } from "express";
import { TransferenciaService } from "../services/TransferenciaService";
import { TransferenciaDTO } from "../dtos/Transferencia.dto";
import { handleError, validateId } from "../../../utils/utils";

export class TransferenciaController {
  private transferenciaService: TransferenciaService;
  
  constructor() {
    this.transferenciaService = new TransferenciaService();
  }
  

  create = async (req: Request, res: Response) => {
    try {
      const transferenciaDTO: TransferenciaDTO = req.body;
      const result = await this.transferenciaService.create(
        transferenciaDTO
      );
      return res.status(201).json(result);
    } catch (error) {
      return handleError(res, error, "Error creating transferencia");
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      validateId(id, res);
      const transferenciaDTO: TransferenciaDTO = req.body;
      const result = await this.transferenciaService.update(
        id,
        transferenciaDTO
      );
      return res.status(200).json(result);
    } catch (error) {
      return handleError(res, error, "Error updating transferencia");
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      validateId(id, res);
      await this.transferenciaService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return handleError(res, error, "Error deleting transferencia");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      validateId(id, res);
      const result = await this.transferenciaService.findById(id);
      return res.status(200).json(result);
    } catch (error) {
      return handleError(res, error, "Error getting transferencia by id");
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const result = await this.transferenciaService.findAll();
      return res.status(200).json(result);
    } catch (error) {
      return handleError(res, error, "Error getting transferencias");
    }
  };

  verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      validateId(id, res);
      const transferencia = await this.transferenciaService.findById(id);
      if (!transferencia) {
        return res.status(404).json({ error: "transferencia not found" });
      }
      return next();
    } catch (error) {
      return handleError(res, error, "Error verifying if transferencia exists");
    }
  };
}