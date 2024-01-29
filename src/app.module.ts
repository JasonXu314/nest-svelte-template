import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PREFIX } from './auth/auth.module';

@Module({
	imports: [
		// AuthModule.register({ prefix: 'placeholder' }),
		ServeStaticModule.forRoot({
			rootPath: 'dist/client/assets',
			serveRoot: '/__app'
		}),
		ServeStaticModule.forRoot({
			rootPath: 'src/client/public',
			serveRoot: '/'
		})
	],
	controllers: [AppController],
	providers: [AppService, { provide: PREFIX, useValue: 'placeholder' }]
})
export class AppModule {
	// public configure(consumer: MiddlewareConsumer): void {
	// 	consumer.apply(AuthMiddleware).forRoutes('*');
	// }
}

