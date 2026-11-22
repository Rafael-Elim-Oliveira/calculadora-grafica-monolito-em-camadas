import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, StreamableFile } from '@nestjs/common';
import { CriarGraficoDto } from 'src/dtos/criar-grafico.dto';
import { GraficoService } from 'src/services/grafico.service';

@Controller('grafico')
export class GraficoController {
    constructor( private readonly graficoService: GraficoService) {}

    @Post()
    async criar(@Body() dto: CriarGraficoDto) {
        return this.graficoService.gerarESalvar(
            dto.usuarioId,
            dto.funcao,
            dto.xMin,
            dto.xMax,
            dto.passo,
        );
    }

    @Get(':id')
    async baixarJson(@Param('id', ParseUUIDPipe) id: string): Promise<StreamableFile> {
        const grafico = await this.graficoService.buscarPorId(id);

        const conteudoJson = JSON.stringify(
            {
                id: grafico.id,
                funcao: grafico.funcao,
                dataCriacao: grafico.dataCriacao,
                totalPontos: grafico.pontos.length,
                pontos: grafico.pontos,
            }, 
            null, 
            2,
        );
        
        const buffer = Buffer.from(conteudoJson, 'utf-8');

        return new StreamableFile(buffer, {
            type: 'appçication/json',
            disposition: `attachment; filename="grafico-${grafico.id}.json"`,
        });
    }

    @Get('usuario/:usuarioId')
    async listarPorUsuario(@Param('usuarioId', ParseUUIDPipe) usuarioId: string) {
        return this.graficoService.listarPorUsuario(usuarioId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletar(@Param('id', ParseUUIDPipe) id: string) {
        await this.graficoService.deletar(id);
    }
}

