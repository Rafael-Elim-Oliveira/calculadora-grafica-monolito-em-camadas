import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CriarGraficoDto {
    @IsUUID('4', { message: 'apenas usuario válido.'})
    @IsNotEmpty()
    usuarioId: string;

    @IsString()
    @IsNotEmpty({ message: 'a função matemática é obrigatória.'})
    funcao: string;
    
    @IsOptional()
    @IsNumber()
    xMin?: number;

    @IsOptional()
    @IsNumber()
    xMax?: number;

    @IsOptional()
    @IsNumber()
    passo?: number;
}