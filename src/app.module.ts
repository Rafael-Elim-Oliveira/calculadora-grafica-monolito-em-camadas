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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Usuario, Grafico],
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
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
