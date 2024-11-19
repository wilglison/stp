import { Request, Response, NextFunction } from "express";
import { UnidadeHospitalarService } from "../services/UnidadeHospitalarService";
import { UnidadeHospitalarDTO } from "../dtos/unidade-hospitalar.dto";
import { handleError, validateId } from "../../../utils/utils";

export class UnidadeHospitalarController {
  private unidadeHospitalarService: UnidadeHospitalarService;

  constructor() {
    this.unidadeHospitalarService = new UnidadeHospitalarService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const unidadeHospitalarDTO: UnidadeHospitalarDTO = req.body;
      const result = await this.unidadeHospitalarService.create(
        unidadeHospitalarDTO
      );
      return res.status(201).json(result);
    } catch (error) {
      return handleError(res, error, "Error creating unidade hospitalar");
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      validateId(id, res);
      const unidadeHospitalarDTO: UnidadeHospitalarDTO = req.body;
      const result = await this.unidadeHospitalarService.update(
        id,
        unidadeHospitalarDTO
      );
      return res.status(200).json(result);
    } catch (error) {
      return handleError(res, error, "Error updating unidade hospitalar");
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      validateId(id, res);
      await this.unidadeHospitalarService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return handleError(res, error, "Error deleting unidade hospitalar");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      validateId(id, res);
      const result = await this.unidadeHospitalarService.findById(id);
      return res.status(200).json(result);
    } catch (error) {
      return handleError(res, error, "Error getting unidade hospitalar by id");
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const result = await this.unidadeHospitalarService.findAll();
      return res.status(200).json(result);
    } catch (error) {
      return handleError(res, error, "Error getting unidade hospitalar");
    }
  };

  verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      validateId(id, res);
      const endereco = await this.unidadeHospitalarService.findById(id);
      if (!endereco) {
        return res.status(404).json({ error: "endereco not found" });
      }
      return next();
    } catch (error) {
      return handleError(res, error, "Error verifying if endereco exists");
    }
  };
  
}