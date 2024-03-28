import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import * as fs from 'fs';

@Injectable()
export class AppService {
  async compareColumns(file1: Express.Multer.File, file2: Express.Multer.File) {
    const workbook1 = xlsx.read(file1.buffer, { type: 'buffer' });
    const workbook2 = xlsx.read(file2.buffer, { type: 'buffer' });

    const sheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
    const sheet2 = workbook2.Sheets[workbook2.SheetNames[0]];

    const columnD = xlsx.utils.sheet_to_json(sheet1, { header: 1 }) as string[][];
    const columnG = xlsx.utils.sheet_to_json(sheet2, { header: 1 }) as string[][];

    let value: string[] = [];
    for (let index = 0; index < columnD.length; index++) {
      const element1 = columnD[index][3];
      for (let index2 = 0; index2 < columnG.length; index2++) {
        const element2 = columnG[index2][6];
        if (element1 === element2) {
          value.push(`Linha: ${index2 + 1}. Do arquivo ${file2.originalname}`);    
        }
      }
    }

    if (value.length === 0) {
      return {message: 'Nenhuma ocorrência repetida.'};
    }

    return value;
  }
}
