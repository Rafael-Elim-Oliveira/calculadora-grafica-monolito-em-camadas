import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { GRAFICO_REPOSITORY, type IGraficoRepository } from 'src/domain/repositories/grafico.repository.interface';
import { UsuarioService } from './usuario.service';
import { Grafico, PontoGrafico } from 'src/domain/entities/grafico.entity';
import { compile } from 'mathjs';

@Injectable()
export class GraficoService {
    constructor(
        @Inject(GRAFICO_REPOSITORY)
        private readonly graficoRepository: IGraficoRepository,
        private readonly usuarioService: UsuarioService,
    ) {}

    async gerarESalvar(
        usuarioId: string,
        funcao: string,
        xMin = -10,
        xMax = 10,
        passo = 1,
    ): Promise<Grafico> {
        if (xMin >= xMax || passo <= 0) {
            throw new BadRequestException('Intervalo ou passo inválido.');
        }

        const usuario = await this.usuarioService.buscarPorId(usuarioId);

        const pontos = this.calcularPontos(funcao, xMin, xMax, passo);

        return this.graficoRepository.criar({
            funcao,
            pontos,
            usuario
        });
    }

    async buscarPorId(id: string): Promise<Grafico> {
        const grafico = await this.graficoRepository.buscarPorId(id);
        if (!grafico) {
            throw new NotFoundException('Gráfico não encontrado.');
        }
        return grafico;
    }

    async listarPorUsuario(usuarioId: string): Promise<Grafico[]> {
        await this.usuarioService.buscarPorId(usuarioId);
        return this.graficoRepository.listarPorUsuario(usuarioId);
    }

    async deletar(id: string): Promise<void> {
        await this.buscarPorId(id);

        await this.graficoRepository.deletar(id);
    }

    private calcularPontos(
        funcao: string,
        xMin: number,
        xMax: number,
        passo: number,
    ): PontoGrafico[] {
        try {
            const funcaoCompilada = compile(funcao);
            const pontos: PontoGrafico[] = [];

            for (let x = xMin; x <= xMax; x = Number((x + passo).toFixed(4))) {
                const y = funcaoCompilada.evaluate({ x });

                if (typeof y === 'number' && Number.isFinite(y)) {
                    pontos.push({ x, y: Number(y.toFixed(4)) });
                }
            }

            return pontos;
        } catch {
            throw new BadRequestException('A expressão matemática "${funcao}" é inválida.');
        }
    }
}
