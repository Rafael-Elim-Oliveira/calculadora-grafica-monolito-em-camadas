import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CriarUsuarioDto {
    @IsString({ message: 'insira apenas texto.' })
    @IsNotEmpty({ message: 'o nome é obrigatório.'})
    @MaxLength(100)
    nome: string;

    @IsEmail({}, { message: 'informe um e-mail válido.'})
    @IsNotEmpty({ message: 'o e-email é obrigatóito.'})
    email: string;
}