import { Module } from '@nestjs/common';
import { UsuarioController } from './controllers/usuario.controller';
import { GraficoController } from './controllers/grafico.controller';
import { UsuarioService } from './services/usuario.service';
import { GraficoService } from './services/grafico.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './domain/entities/usuario.entity';
import { Grafico } from './domain/entities/grafico.entity';
import { USUARIO_REPOSITORY } from './domain/repositories/usuario.repository.interface';
import { UsuarioTypeOrmRepository } from './infrastructure/repositories/usuario.typeorm-repository';
import { GRAFICO_REPOSITORY } from './domain/repositories/grafico.repository.interface';
import { GraficoTypeOrmRepository } from './infrastructure/repositories/grafico.typeorm-repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'loalhost',
      port: 5432,
      username: 'calculadora',
      password: 'calculadora',
      database: 'calculadora_db',
      entities: [Usuario, Grafico],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Usuario, Grafico])
  ],
  controllers: [UsuarioController, GraficoController],
  providers: [
    UsuarioService, 
    GraficoService,
    {
      provide: USUARIO_REPOSITORY,
      useClass: UsuarioTypeOrmRepository,
    }, 
    {
      provide: GRAFICO_REPOSITORY,
      useClass: GraficoTypeOrmRepository,
    },
  ],
})
export class AppModule {}
