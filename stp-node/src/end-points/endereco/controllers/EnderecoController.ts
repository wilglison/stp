import { EnderecoDTO } from "../dtos/endereco.dto";
import { EnderecoService } from "../services/EnderecoService";
import { Request, Response, NextFunction } from "express";

class EnderecoController {
  private enderecoService: EnderecoService;

  constructor() {
    this.enderecoService = new EnderecoService();
  }

  create = async (req: Request, res: Response) => {
    const enderecoDTO: EnderecoDTO = req.body;
    try {
      const endereco = await this.enderecoService.create(enderecoDTO);
      return res.status(201).json(endereco);
    } catch (error) {
      this.handleError(res, error, "Error creating endereco");
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const enderecos = await this.enderecoService.getAll();
      return res.status(200).json(enderecos);
    } catch (error) {
      this.handleError(res, error, "Error getting enderecos");
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!this.validateId(id)) {
        return res.status(404).json({ error: "Endereco not found." });
      }
      const endereco = await this.enderecoService.getById(id);
      if (!endereco) {
        return res.status(404).json({ error: "Endereco not found" });
      }
      return res.status(200).json(endereco);
    } catch (error) {
      this.handleError(res, error, "Error getting endereco by id");
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.enderecoService.delete(id);
      return res.status(204).send();
    } catch (error) {
      this.handleError(res, error, "Error deleting endereco");
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const enderecoDTO: EnderecoDTO = req.body;
    try {
      const endereco = await this.enderecoService.update(id, enderecoDTO);
      return res.status(200).json(endereco);
    } catch (error) {
      this.handleError(res, error, "Error updating endereco");
    }
  };

  verifyIfExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!this.validateId(id)) {
        return res.status(404).json({ error: "Endereco not found." });
      }
      const endereco = await this.enderecoService.getById(id);
      if (!endereco) {
        return res.status(404).json({ error: "endereco not found" });
      }
      return next();
    } catch (error) {
      this.handleError(res, error, "Error verifying if endereco exists");
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

export { EnderecoController };
