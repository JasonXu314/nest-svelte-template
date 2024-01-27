import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Page } from './utils/decorators/page.decorator';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('/')
	@Page()
	getHello(): void {}

	@Get('/:param')
	@Render('index')
	param(@Param('param') param): PageProps<{ initial: number }> {
		return { initial: param.length };
	}

	@Get('/test/:name')
	@Page()
	testName(): void {}

	@Get('/:name/hi')
	@Page()
	idHi(): void {}
}

