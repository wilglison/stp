import { Request, Response, NextFunction } from "express";
import { MedicoService } from "../services/MedicoService";
import { MedicoDTO } from "../dtos/medico.dto";

class MedicoController {
  private medicoService: MedicoService;

  constructor() {
    this.medicoService = new MedicoService();
  }

  create = async (req: Request, res: Response) => {
    const medicoDTO: MedicoDTO = req.body;
    try {
      const medico = await this.medicoService.create(medicoDTO);
      return res.status(201).json(medico);
    } catch (error) {
      this.handleError(res, error, "Error creating Medico");
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const medicos = await this.medicoService.getAll();
      return res.status(200).json(medicos);
    } catch (error) {
      this.handleError(res, error, "Error getting Medicos");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!this.validateId(id)) {
        return res.status(404).json({ error: "Medico not found." });
      }
      const medico = await this.medicoService.getById(id);
      if (!medico) {
        return res.status(404).json({ error: "Medico not found" });
      }
      return res.status(200).json(medico);
    } catch (error) {
      this.handleError(res, error, "Error getting Medico by id");
    }
  };

  getByName = async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const medico = await this.medicoService.getByName(name);
      if (!medico) {
        return res.status(404).json({ error: "Medico not found" });
      }
      return res.status(200).json(medico);
    } catch (error) {
      this.handleError(res, error, "Error getting Medico by name");
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.medicoService.delete(id);
      return res.status(204).send();
    } catch (error) {
      this.handleError(res, error, "Error deleting Medico");
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const medicoDTO: MedicoDTO = req.body;
    try {
      const medico = await this.medicoService.update(id, medicoDTO);
      return res.status(200).json(medico);
    } catch (error) {
      this.handleError(res, error, "Error updating Medico");
    }
  };

  verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!this.validateId(id)) {
        return res.status(404).json({ error: "Medico not found." });
      }
      const medico = await this.medicoService.getById(id);
      if (!medico) {
        return res.status(404).json({ error: "Medico not found" });
      }
      return next();
    } catch (error) {
      this.handleError(res, error, "Error verifying if Medico exists");
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

export { MedicoController };
