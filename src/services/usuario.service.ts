import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { USUARIO_REPOSITORY, type IUsuaryRepository } from 'src/domain/repositories/usuario.repository.interface';
import { Usuario } from 'src/domain/entities/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @Inject(USUARIO_REPOSITORY)
        private readonly usuarioRepository: IUsuaryRepository,
    ) {}

    async criar(nome: string, email: string): Promise<Usuario> {
        const emailJaCadastrado = await this.usuarioRepository.buscarPorEmail(email);
        if (emailJaCadastrado) {
            throw new ConflictException('E-mail já cadastrado.');
        }
        return this.usuarioRepository.criar({ nome, email });
    }

    async buscarPorId(id: string): Promise<Usuario> {
        const usuario = await this.usuarioRepository.buscarPorId(id);
        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado.');
        }
        return usuario;
    }
}
