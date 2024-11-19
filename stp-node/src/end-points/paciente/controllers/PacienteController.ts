import { Request, Response, NextFunction } from "express";
import { PacienteService } from "../services/PacienteService";
import { PacienteDTO } from "../dtos/paciente.dto";

class PacienteController {
  private pacienteService: PacienteService;

  constructor() {
    this.pacienteService = new PacienteService();
  }

  create = async (req: Request, res: Response) => {
    const pacienteDTO: PacienteDTO = req.body;
    try {
      const paciente = await this.pacienteService.create(pacienteDTO);
      return res.status(201).json(paciente);
    } catch (error) {
      this.handleError(res, error, "Error creating paciente");
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const pacientes = await this.pacienteService.getAll();
      return res.status(200).json(pacientes);
    } catch (error) {
      this.handleError(res, error, "Error getting pacientes");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!this.validateId(id)) {
        return res.status(404).json({ error: "Paciente not found." });
      }
      const paciente = await this.pacienteService.getById(id);
      if (!paciente) {
        return res.status(404).json({ error: "Paciente not found" });
      }
      return res.status(200).json(paciente);
    } catch (error) {
      this.handleError(res, error, "Error getting paciente by id");
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.pacienteService.delete(id);
      return res.status(204).send();
    } catch (error) {
      this.handleError(res, error, "Error deleting paciente");
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const pacienteDTO: PacienteDTO = req.body;
    try {
      const paciente = await this.pacienteService.update(id, pacienteDTO);
      return res.status(200).json(paciente);
    } catch (error) {
      this.handleError(res, error, "Error updating paciente");
    }
  };

  verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!this.validateId(id)) {
        return res.status(404).json({ error: "Paciente not found." });
      }
      const paciente = await this.pacienteService.getById(id);
      if (!paciente) {
        return res.status(404).json({ error: "Paciente not found" });
      }
      return next();
    } catch (error) {
      this.handleError(res, error, "Error verifying if paciente exists");
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

export { PacienteController };
