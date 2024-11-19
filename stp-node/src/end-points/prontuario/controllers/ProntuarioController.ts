import { Request, Response, NextFunction } from "express";
import { ProntuarioService } from "../services/ProntuarioService";
import { ProntuarioDTO } from "../dtos/prontuario.dto";

class ProntuarioController {
  private prontuarioService: ProntuarioService;

  constructor() {
    this.prontuarioService = new ProntuarioService();
  }

  create = async (req: Request, res: Response) => {
    const prontuarioDTO: ProntuarioDTO = req.body;
    try {
      const prontuario = await this.prontuarioService.create(prontuarioDTO);
      return res.status(201).json(prontuario);
    } catch (error) {
      this.handleError(res, error, "Error creating Prontuario");
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const prontuarios = await this.prontuarioService.getAll();
      return res.status(200).json(prontuarios);
    } catch (error) {
      this.handleError(res, error, "Error getting Prontuarios");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!this.validateId(id)) {
        return res.status(404).json({ error: "Prontuario not found." });
      }
      const prontuario = await this.prontuarioService.getById(id);
      if (!prontuario) {
        return res.status(404).json({ error: "Prontuario not found" });
      }
      return res.status(200).json(prontuario);
    } catch (error) {
      this.handleError(res, error, "Error getting Prontuario by id");
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.prontuarioService.delete(id);
      return res.status(204).send();
    } catch (error) {
      this.handleError(res, error, "Error deleting Prontuario");
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const prontuarioDTO: ProntuarioDTO = req.body;
    try {
      const prontuario = await this.prontuarioService.update(id, prontuarioDTO);
      return res.status(200).json(prontuario);
    } catch (error) {
      this.handleError(res, error, "Error updating Prontuario");
    }
  };

  verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!this.validateId(id)) {
        return res.status(404).json({ error: "Prontuario not found." });
      }
      const prontuario = await this.prontuarioService.getById(id);
      if (!prontuario) {
        return res.status(404).json({ error: "Prontuario not found" });
      }
      return next();
    } catch (error) {
      this.handleError(res, error, "Error verifying if Prontuario exists");
    }
  };

  private validateId(id: string) {
    return id.length === 24;
  }

  private handleError(res: Response, error: unknown, msg: string) {
    console.error(`${msg}:`, error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
}

export { ProntuarioController };
