import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "src/domain/entities/usuario.entity";
import { IUsuaryRepository } from "src/domain/repositories/usuario.repository.interface";

@Injectable()
export class UsuarioTypeOrmRepository implements IUsuaryRepository {
    constructor(
        @InjectRepository(Usuario)
        private readonly ormRepository: Repository<Usuario>,
    ) {}

    async criar(dados: Partial<Usuario>): Promise<Usuario> {
    const usuario = this.ormRepository.create(dados);
    return this.ormRepository.save(usuario);
    }

    async buscarPorId(id: string): Promise<Usuario | null> {
        return this.ormRepository.findOne({ where: { id } })
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        return this.ormRepository.findOne({ where: { email } });
    }
}

