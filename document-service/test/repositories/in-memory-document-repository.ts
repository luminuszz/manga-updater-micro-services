import { Document, Status } from '@app/entities/document.entitiy';
import { DocumentRepository } from '@app/repositories/document-repository';

export class InMemoryDocumentRepository implements DocumentRepository {
  private documents: Document[] = [];

  async updateDocumentStatus(id: string, status: Status): Promise<void> {
    const index = this.documents.findIndex((doc) => doc.id === id);

    if (index >= 0) {
      this.documents[index].status = status;
    }
  }

  async findDocumentById(id: string): Promise<Document | null> {
    console.log({ documents: this.documents[0] });

    return this.documents.find((document) => document.id === id) || null;
  }

  async createDocument(document: Document): Promise<void> {
    this.documents.push(document);
  }

  async findAllDocumentWithUnreadStatus(): Promise<Document[]> {
    return this.documents.filter((item) => item.status === 'unread');
  }

  async findDocumentByName(name: string): Promise<Document | null> {
    const document = this.documents.find((item) => item.name === name);

    return document || null;
  }

  async findDocumentByRecipentId(
    recipientId: string,
  ): Promise<Document | null> {
    return (
      this.documents.find((item) => item.recipientId === recipientId) || null
    );
  }
}