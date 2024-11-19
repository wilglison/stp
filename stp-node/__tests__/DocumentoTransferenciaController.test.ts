import { Request, Response, NextFunction } from "express";
import { DocumentoTransferenciaController } from "../src/end-points/documento-transferencia/controllers/DocumentoTransferenciaController";
import { DocumentoTransferenciaService } from "../src/end-points/documento-transferencia/services/DocumentoTransferenciaService";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";

jest.mock("../src/end-points/documento-transferencia/services/DocumentoTransferenciaService");

describe("DocumentoTransferenciaController", () => {
  let documentoTransferenciaController: DocumentoTransferenciaController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockDocumento: any;

  beforeEach(() => {
    documentoTransferenciaController = new DocumentoTransferenciaController();
    mockRequest = {
      params: {},
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response>;
    mockNext = jest.fn();
    mockDocumento = {
      id: "123",
      drogasAdministradas: "Test Drogas",
      procedimentosAcondicionamento: "Test Acondicionamento",
      procedimentosRecebimento: "Test Recebimento",
      solicitacao: "Test Solicitacao",
      transferencia: "Test Transferencia",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  describe("create", () => {
    it("should create a documento transferencia successfully", async () => {
      mockRequest.body = mockDocumento;
      jest.spyOn(DocumentoTransferenciaService.prototype, "create").mockResolvedValue(mockDocumento);

      await documentoTransferenciaController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDocumento);
    });

    it("should handle errors when creating documento transferencia", async () => {
      const error = new Error("Creation failed");
      jest.spyOn(DocumentoTransferenciaService.prototype, "create").mockRejectedValue(error);

      await documentoTransferenciaController.create(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Error creating documento transferencia",
      });
    });
  });

  describe("update", () => {
    it("should update a documento transferencia successfully", async () => {
      const updatedDocumento = {
        ...mockDocumento,
        drogasAdministradas: "Updated Drogas",
        procedimentosAcondicionamento: "Updated Acondicionamento",
        procedimentosRecebimento: "Updated Recebimento",
        solicitacao: "Updated Solicitacao",
        transferencia: "Updated Transferencia",
      };
      mockRequest.params = { id: "123" };
      mockRequest.body = updatedDocumento;
      jest.spyOn(DocumentoTransferenciaService.prototype, "update").mockResolvedValue(updatedDocumento);

      await documentoTransferenciaController.update(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedDocumento);
    });
  });

  describe("delete", () => {
    it("should delete a documento transferencia successfully", async () => {
      mockRequest.params = { id: "123" };
      jest.spyOn(DocumentoTransferenciaService.prototype, "delete").mockResolvedValue(mockDocumento);

      await documentoTransferenciaController.delete(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should get a documento transferencia by id successfully", async () => {
      mockRequest.params = { id: "123" };
      jest.spyOn(DocumentoTransferenciaService.prototype, "findById").mockResolvedValue(mockDocumento);

      await documentoTransferenciaController.getById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDocumento);
    });
  });

  describe("getAll", () => {
    it("should get all documentos transferencia successfully", async () => {
      const mockDocumentos = [mockDocumento, { ...mockDocumento, id: "456" }];
      jest.spyOn(DocumentoTransferenciaService.prototype, "findAll").mockResolvedValue(mockDocumentos);

      await documentoTransferenciaController.getAll(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDocumentos);
    });
  });

  describe("verifyIfExists", () => {
    it("should verify if documento exists and call next", async () => {
      mockRequest.params = { id: "123" };
      jest.spyOn(DocumentoTransferenciaService.prototype, "findById").mockResolvedValue(mockDocumento);

      await documentoTransferenciaController.verifyIfExists(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it("should return 404 if documento not found", async () => {
      mockRequest.params = { id: "123" };
      jest.spyOn(DocumentoTransferenciaService.prototype, "findById").mockResolvedValue(null);

      await documentoTransferenciaController.verifyIfExists(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: "endereco not found" });
    });
  });
});
