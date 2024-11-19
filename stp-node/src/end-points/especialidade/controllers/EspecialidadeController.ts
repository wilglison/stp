import { EspecialidadeDTO } from "../dtos/especialidade.dto";
import { EspecialidadeService } from "../services/EspecialidadeService";
import { Request, Response, NextFunction } from "express";

class EspecialidadeController {
  private especialidadeService: EspecialidadeService;

  constructor() {
    this.especialidadeService = new EspecialidadeService();
  }

  create = async (req: Request, res: Response) => {
    const especialidadeDTO: EspecialidadeDTO = req.body;
    try {
      const especialidade = await this.especialidadeService.create(
        especialidadeDTO
      );
      return res.status(201).json(especialidade);
    } catch (error) {
      this.handleError(res, error, "Error creating Especialidade");
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const especialidades = await this.especialidadeService.getAll();
      return res.status(200).json(especialidades);
    } catch (error) {
      this.handleError(res, error, "Error getting Especialidades");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!this.validateId(id)) {
        return res.status(404).json({ error: "Especialidades not found." });
      }
      const especialidade = await this.especialidadeService.getById(id);
      if (!especialidade) {
        return res.status(404).json({ error: "Especialidades not found" });
      }
      return res.status(200).json(especialidade);
    } catch (error) {
      this.handleError(res, error, "Error getting Especialidade by id");
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.especialidadeService.delete(id);
      return res.status(204).send();
    } catch (error) {
      this.handleError(res, error, "Error deleting Especialidade");
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const especialidadeDTO: EspecialidadeDTO = req.body;
    try {
      const especialidade = await this.especialidadeService.update(id, especialidadeDTO);
      return res.status(200).json(especialidade);
    } catch (error) {
      this.handleError(res, error, "Error updating Especialidade");
    }
  };

  verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!this.validateId(id)) {
        return res.status(404).json({ error: "Especialidade not found." });
      }
      const especialidade = await this.especialidadeService.getById(id);
      if (!especialidade) {
        return res.status(404).json({ error: "Especialidade not found" });
      }
      return next();
    } catch (error) {
      this.handleError(res, error, "Error verifying if Especialidade exists");
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

export { EspecialidadeController };
