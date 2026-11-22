import { Grafico } from "../entities/grafico.entity";

export const GRAFICO_REPOSITORY = Symbol('GRAFICO_REPOSITORY');

export interface IGraficoRepository {
    criar(dados: Partial<Grafico>): Promise<Grafico>;
    buscarPorId(id: string): Promise<Grafico | null>;
    listarPorUsuario(usuarioId: string): Promise<Grafico[]>;
    deletar(id: string): Promise<void>
}