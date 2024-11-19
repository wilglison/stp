import { Router } from "express";
import { EspecialidadeController } from "./end-points/especialidade/controllers/EspecialidadeController";
import { MedicoController } from "./end-points/medico/controllers/MedicoController";
import { PacienteController } from "./end-points/paciente/controllers/PacienteController";
import { UserController } from "./end-points/user/controllers/UserController";
import { TransferenciaController } from "./end-points/transferencia/controllers/TransferenciaController";
import { UnidadeHospitalarController } from "./end-points/unidade-hospitalar/controllers/UnidadeHospitalarController";
import { DocumentoTransferenciaController } from "./end-points/documento-transferencia/controllers/DocumentoTransferenciaController";
import { EnderecoController } from "./end-points/endereco/controllers/EnderecoController";
import { MedicamentoController } from "./end-points/medicamento/controllers/MedicamentoController";
import { ProntuarioController } from "./end-points/prontuario/controllers/ProntuarioController";
import { checkRole, jwtMiddleware } from "../middlewares/auth";

const routes = Router();
const userController = new UserController();
const pacienteController = new PacienteController();
const medicoController = new MedicoController();
const especialidadeController = new EspecialidadeController();
const prontuarioController = new ProntuarioController();
const transferenciaController = new TransferenciaController();
const unidadeHospitalarController = new UnidadeHospitalarController();
const documentoTransferenciaController = new DocumentoTransferenciaController();
const enderecoController = new EnderecoController();
const medicamentoController = new MedicamentoController();
const authController = new UserController();

const path = "/api";

// Rotas de autenticação
routes.post(`${path}/auth`, authController.login);
routes.post(`${path}/user`, userController.create);

// Rotas de endereço
routes.get(`${path}/endereco`, jwtMiddleware, checkRole(["ROLE_USER"]), enderecoController.getAll);
routes.post(`${path}/endereco`, jwtMiddleware, checkRole(["ROLE_USER"]), enderecoController.create);
routes.get(`${path}/endereco/:id`, jwtMiddleware, checkRole(["ROLE_USER"]), enderecoController.getById);
routes.delete(`${path}/endereco/:id`, jwtMiddleware, checkRole(["ROLE_USER"]), enderecoController.verifyIfExists, enderecoController.delete);
routes.put(`${path}/endereco/:id`, jwtMiddleware, checkRole(["ROLE_USER"]), enderecoController.update);

// Rotas de especialidade
routes.get(`${path}/especialidade`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), especialidadeController.getAll);
routes.post(`${path}/especialidade`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), especialidadeController.create);
routes.get(`${path}/especialidade/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), especialidadeController.getById);
routes.delete(`${path}/especialidade/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), especialidadeController.verifyIfExists, especialidadeController.delete);
routes.put(`${path}/especialidade/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), especialidadeController.update);

// Rotas de medicamento
routes.get(`${path}/medicamento`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), medicamentoController.getAll);
routes.post(`${path}/medicamento`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), medicamentoController.create);
routes.get(`${path}/medicamento/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), medicamentoController.getById);
routes.delete(`${path}/medicamento/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), medicamentoController.verifyIfExists, medicamentoController.delete);
routes.put(`${path}/medicamento/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), medicamentoController.update);

// Rotas de usuário
routes.get(`${path}/user`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), userController.getAll);
routes.post(`${path}/user`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), userController.create);
routes.get(`${path}/user/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), userController.getById);
routes.delete(`${path}/user/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), userController.verifyIfExists, userController.delete);
routes.put(`${path}/user/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), userController.update);

// Rotas de médico
routes.get(`${path}/medico`, jwtMiddleware, checkRole(["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), medicoController.getAll);
routes.get(`${path}/medico/search/:name`, jwtMiddleware, checkRole(["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), medicoController.getByName);
routes.get(`${path}/medico/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), medicoController.getById);
routes.post(`${path}/medico`, jwtMiddleware, checkRole(["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), medicoController.create);
routes.delete(`${path}/medico/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), medicoController.verifyIfExists, medicoController.delete);
routes.put(`${path}/medico/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), medicoController.update);

// Rotas de paciente
routes.get(`${path}/paciente`, jwtMiddleware, checkRole(["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), pacienteController.getAll);
routes.post(`${path}/paciente`, jwtMiddleware, checkRole(["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), pacienteController.create);
routes.get(`${path}/paciente/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), pacienteController.getById);
routes.delete(`${path}/paciente/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), pacienteController.verifyIfExists, pacienteController.delete);
routes.put(`${path}/paciente/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN", "ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), pacienteController.update);

// Rotas de prontuário
routes.get(`${path}/prontuario`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), prontuarioController.getAll);
routes.post(`${path}/prontuario`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), prontuarioController.create);
routes.get(`${path}/prontuario/:id`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), prontuarioController.getById);
routes.delete(`${path}/prontuario/:id`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), prontuarioController.verifyIfExists, prontuarioController.delete);
routes.put(`${path}/prontuario/:id`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), prontuarioController.update);

// Rotas de unidade hospitalar
routes.get(`${path}/unidade`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), unidadeHospitalarController.getAll);
routes.post(`${path}/unidade`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), unidadeHospitalarController.create);
routes.get(`${path}/unidade/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), unidadeHospitalarController.getById);
routes.delete(`${path}/unidade/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), unidadeHospitalarController.verifyIfExists, unidadeHospitalarController.delete);
routes.put(`${path}/unidade/:id`, jwtMiddleware, checkRole(["ROLE_ADMIN"]), unidadeHospitalarController.update);

// Rotas de transferência
routes.get(`${path}/transferencia`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), transferenciaController.getAll);
routes.post(`${path}/transferencia`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), transferenciaController.create);
routes.get(`${path}/transferencia/:id`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), transferenciaController.getById);
routes.delete(`${path}/transferencia/:id`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), transferenciaController.verifyIfExists, transferenciaController.delete);
routes.put(`${path}/transferencia/:id`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), transferenciaController.update);

// Rotas de documento de transferência
routes.get(`${path}/documento`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), documentoTransferenciaController.getAll);
routes.post(`${path}/documento`, jwtMiddleware, checkRole(["ROLE_MEDICO_REGULADOR"]), documentoTransferenciaController.create);
routes.get(`${path}/documento/:id`, jwtMiddleware, checkRole(["ROLE_MEDICO", "ROLE_MEDICO_REGULADOR"]), documentoTransferenciaController.getById);
routes.delete(`${path}/documento/:id`, jwtMiddleware, checkRole(["ROLE_MEDICO_REGULADOR"]), documentoTransferenciaController.verifyIfExists, documentoTransferenciaController.delete);
routes.put(`${path}/documento/:id`, jwtMiddleware, checkRole(["ROLE_MEDICO_REGULADOR"]), documentoTransferenciaController.update);

export { routes };
