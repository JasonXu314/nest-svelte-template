import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule, PREFIX } from './auth/auth.module';

@Module({
	imports: [
		AuthModule.register({ prefix: 'placeholder' }),
		ServeStaticModule.forRoot({
			rootPath: 'dist/client/assets',
			serveRoot: '/__app'
		})
	],
	controllers: [AppController],
	providers: [AppService, { provide: PREFIX, useValue: 'placeholder' }]
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(AuthMiddleware).forRoutes('*');
	}
}

