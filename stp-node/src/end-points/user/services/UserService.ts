import { prisma } from "../../../prisma";
import { hash, compare } from "bcryptjs";
import { UserDTO } from "../dtos/user.dto";
import { sign } from "jsonwebtoken";

class UserService {
  private readonly userSelect = {
    id: true,
    login: true,
    roles: true,
    password: false,
    createdAt: true,
    updatedAt: true,
  };

  async create(userDTO: UserDTO) {
    const { login, password, roles } = userDTO;
    try {
      const userExists = await prisma.user.findUnique({
        where: { login },
        select: this.userSelect,
      });

      if (userExists) {
        throw new Error("User already exists");
      }

      const hashedPassword = await hash(password, 10);
      return await prisma.user.create({
        data: {
          login,
          roles: roles,
          password: hashedPassword,
        },
        select: this.userSelect,
      });
    } catch (error) {
      console.error(`Error creating user ${error}`);
      throw error;
    }
  }

  async getAll() {
    try {
      return await prisma.user.findMany({
        select: this.userSelect,
      });
    } catch (error) {
      console.error(`Error getting users ${error}`);
      throw error;
    }
  }

  async getById(id: string) {
    try {
      return await prisma.user.findUnique({
        where: { id },
        select: this.userSelect,
      });
    } catch (error) {
      console.error(`Error finding user by id ${error}`);
      throw error;
    }
  }

  async update(id: string, userDTO: UserDTO) {
    const { login, password, roles } = userDTO;
    try {
      const hashedPassword = await hash(password, 10);
      return await prisma.user.update({
        where: { id },
        data: {
          login,
          roles: roles,
          password: hashedPassword,
        },
        select: this.userSelect,
      });
    } catch (error) {
      console.error(`Error updating user ${error}`);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error deleting user ${error}`);
      throw error;
    }
  }

  async login(login: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { login },
        select: {
          id: true,
          login: true,
          roles: true,
          password: true,
        },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Senha inválida");
      }

      const token = sign({ id: user.id, roles: user.roles }, process.env.JWT_SECRET || "stp123", { expiresIn: "1d" });

      return {
        user: { id: user.id, login: user.login, roles: user.roles },
        token,
      };
    } catch (error) {
      console.error(`Erro ao fazer login ${error}`);
      throw error;
    }
  }

  async getUserByLogin(login: string) {
    try {
      return await prisma.user.findUnique({
        where: { login },
        select: this.userSelect,
      });
    } catch (error) {
      console.error(`Error finding user by login ${error}`);
      throw error;
    }
  }
}

export { UserService };
