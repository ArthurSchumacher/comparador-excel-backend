import { Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('compare')
  @UseInterceptors(FilesInterceptor('files'))
  async compareFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (files.length !== 2) {
      throw new Error('Exactly 2 files must be provided.');
    }

    const [file1, file2] = files;
    return this.appService.compareColumns(file1, file2);
  }
}
