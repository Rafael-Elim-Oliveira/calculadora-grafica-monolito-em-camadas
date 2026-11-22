import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Grafico } from "src/domain/entities/grafico.entity";
import { IGraficoRepository } from "src/domain/repositories/grafico.repository.interface";

@Injectable()
export class GraficoTypeOrmRepository implements IGraficoRepository {
    constructor(
        @InjectRepository(Grafico)
        private readonly ormRepository: Repository<Grafico>,
    ) {}

    async criar(dados: Partial<Grafico>): Promise<Grafico> {
        const grafico = this.ormRepository.create(dados);
        return this.ormRepository.save(grafico);
    }

    async buscarPorId(id: string): Promise<Grafico | null> {
        return this.ormRepository.findOne({
            where: { id },
            relations: { usuario: true },
        });
    }

    async listarPorUsuario(usuarioId: string): Promise<Grafico[]> {
        return this.ormRepository.find({
            where: { usuario: { id: usuarioId } },
            order: { dataCriacao: 'DESC'},
        })
    }

    async deletar(id: string): Promise<void> {
       await this.ormRepository.delete(id);
    }
}