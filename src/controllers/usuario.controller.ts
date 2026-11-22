import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CriarUsuarioDto } from 'src/dtos/criar-usuario.dto';
import { UsuarioService } from 'src/services/usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    async criar(@Body() dto: CriarUsuarioDto) {
        return this.usuarioService.criar(dto.nome, dto.email)
    }

    @Get(':id')
    async buscarPorID(@Param('id', ParseUUIDPipe) id: string) {
        return this.usuarioService.buscarPorId(id);
    }
}
