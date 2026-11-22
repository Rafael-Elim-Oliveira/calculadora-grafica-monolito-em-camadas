import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Grafico } from "./grafico.entity";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    nome: string;

    @Column({ length: 100 })
    email: string;

    @OneToMany(() => Grafico, (grafico) => grafico.usuario)
    graficos: Grafico[];
}