import { Usuario } from "../entities/usuario.entity";

export const USUARIO_REPOSITORY = Symbol('USUARIO_REPOSITORY');

export interface IUsuaryRepository {
    criar(dados: Partial<Usuario>): Promise<Usuario>;
    buscarPorId(id: string): Promise<Usuario | null>
    buscarPorEmail(email: string): Promise<Usuario | null>;
}