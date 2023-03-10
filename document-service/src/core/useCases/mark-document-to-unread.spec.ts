import { DocumentRepository } from '../repositories/document-repository';
import { InMemoryDocumentRepository } from '@test/repositories/in-memory-document-repository';
import { MakeDocument } from '@test/helpers/make-document';
import { MarkDocumentToUnread } from '../useCases/mark-document-to-unread';
import { FindDocumentById } from '../useCases/find-document-by-id';
import { NotFoundDocumentError } from '../useCases/errors/not-found-document-error';

describe('UpdateToReadDocumentStatus', () => {
  let documentRepository: DocumentRepository;

  beforeEach(() => {
    documentRepository = new InMemoryDocumentRepository();
  });

  it('should be able to update a document status to unread', async () => {
    const document = MakeDocument.create();
    const findDocument = new FindDocumentById(documentRepository);
    const service = new MarkDocumentToUnread(documentRepository);

    await documentRepository.createDocument(document);

    await service.execute({
      id: document.id,
    });

    const { document: updatedDocument } = await findDocument.execute({
      id: document.id,
    });

    expect(updatedDocument?.hasNewchapter).toBe(true);
  });

  it('should be able to return null if document not found', async () => {
    const fake_id = 'fake_id';

    await documentRepository.createDocument(
      MakeDocument.create({ id: 'other_id' }),
    );

    const updateToReadDocumentStatus = new MarkDocumentToUnread(
      documentRepository,
    );

    await expect(
      updateToReadDocumentStatus.execute({ id: fake_id }),
    ).rejects.toBeInstanceOf(NotFoundDocumentError);
  });
});
