import { Injectable } from '@nestjs/common';
import { DocumentRepository } from '@app/repositories/document-repository';
import { UseCaseService } from '@app/useCases/useCase.type';

import { Document } from '@app/entities/document.entitiy';

type Input = {
  name: string;
};

type Output = {
  document: Document | null;
};

@Injectable()
export class FindDocumentByName implements UseCaseService<Input, Output> {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute({ name }: Input): Promise<Output> {
    const document = await this.documentRepository.findDocumentByName(name);

    return {
      document,
    };
  }
}
