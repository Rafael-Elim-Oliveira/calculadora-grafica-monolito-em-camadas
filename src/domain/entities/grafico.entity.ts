import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

export interface PontoGrafico {
    x: number;
    y: number;
}

@Entity('graficos')
export class Grafico {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    funcao: string;

    @Column({ type: 'jsonb' })
    pontos: PontoGrafico[];

    @Column({ name: 'usuarioId' })
    usuarioId: string;

    @CreateDateColumn()
    dataCriacao: Date;

    @ManyToMany(() => Usuario, (usuario) => usuario.graficos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuarioId' })
    usuario: Usuario;
}