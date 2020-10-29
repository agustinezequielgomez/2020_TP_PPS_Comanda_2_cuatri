import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeType, DocumentData, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataBaseCollections } from '../Models/Enums/data-base-collections.enum';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private store: AngularFirestore) { }

  /**
   * Retrieves an AngularFirestoreCollection
   * @param collectionName Name of the collection
   * @param query Optional query for the collection
   */
  public getCollection<T>(collectionName: string, query?: QueryFn): AngularFirestoreCollection<T> {
    return this.store.collection<T>(collectionName, query);
  }

  private async setDocument<T>(collection: string, documentId: string, object: T): Promise<void> {
    return this.getCollection(collection).doc(documentId).set(object);
  }

  private async updateDocument<T>(collection: string, documentId: string, object: T): Promise<void> {
    return this.getCollection(collection).doc(documentId).update(object);
  }

  /**
   * Retrieves a document object
   * @param collectionName Name of the collection
   * @param documentId ID of the document to query
   */
  private async getDocument<T>(collection: string, documentId: string): Promise<firebase.firestore.DocumentSnapshot<DocumentData>> {
    return this.getCollection<T[]>(collection).doc<T>(documentId).get().toPromise();
  }

  /**
   * Retrieves a document stream
   * @param collectionName Name of the collection
   * @param documentId ID of the document to query
   */
  private getDocumentStream<T>(collection: string, documentId: string): AngularFirestoreDocument<T> {
    return this.getCollection<T[]>(collection).doc<T>(documentId);
  }

  public async documentExists(collection: string, documentId: string): Promise<boolean> {
    const DOC_REF = await this.getDocument(collection, documentId);
    return DOC_REF.exists;
  }

  /** Gets an observable of collection data
   * @param collectionName Name of the collection
   * @param query Optional query for the collection
   */
  public getDataStream<T>(collectionName: string, query?: QueryFn): Observable<T[]> {
    return this.getCollection<T>(collectionName, query).valueChanges();
  }

  /**
   * Gets every document on the collection that fullfils the query
   * @param collectionName Name of the collection to query
   * @param query Query to execute on the collection
   */
  public async queryCollection<T>(collectionName: DataBaseCollections, query: QueryFn): Promise<{id: string, data: T}[]> {
    const queryResult = await this.getCollection<T>(collectionName, query).get().toPromise();
    const result: {id: string, data: T}[] = [];
    for (const document of queryResult.docs) {
      result.push({id: document.id, data: document.data() as T});
    }

    return result;
  }

  /**
   * Returns an observable of all the data of the documents including the document ID
   * @param collectionName Name of the collection
   * @param changeType Optional type of change to query
   * @param query Optional query for the collection
   */
  public getComplexDataStream<T>(collectionName: string, changeType: DocumentChangeType[] = [], query?: QueryFn): Observable<T[]> {
    return this.getCollection<T>(collectionName, query).snapshotChanges(changeType).pipe(
      map(data => data.map((val) => {
        const DATA: T = val.payload.doc.data() as T;
        const ID = val.payload.doc.id;
        return { ID, ...DATA };
      })));
  }

  /** Retrieves specific document data within a collection
   * @param collectionName Name of the collection
   * @param documentId ID of the document to query
   */
  public async getDocumentData<T>(collection: string, documentId: string): Promise<T> {
    const DATA: T = (await this.getDocument(collection, documentId)).data() as T;
    return DATA;
  }

  /** Gets specific document data stream within a collection
   * @param collectionName Name of the collection
   * @param documentId ID of the document to query
   */
  public getDocumentDataStream<T>(collection: string, documentId: string): Observable<T> {
    return this.getDocumentStream<T>(collection, documentId).valueChanges();
  }

  /** Gets complex document data stream within a collection
   * @param collectionName Name of the collection
   * @param documentId ID of the document to query
   */
  public getDocumentComplexDataStream<T>(collection: string, documentId: string): Observable<T> {
    return this.getDocumentStream<T>(collection, documentId).snapshotChanges().pipe(
      map((document) => {
        const DATA = document.payload.data() as T;
        const ID = document.payload.id;
        return {ID, ...DATA };
      })
    );
  }

  public async saveDocument<T>(collection: string, documentId: string, object: T): Promise<void> {
    if (await this.documentExists(collection, documentId)) {
      return this.updateDocument<T>(collection, documentId, object);
    } else {
      return this.setDocument<T>(collection, documentId, object);
    }
  }

  public async deleteDocument(collection: string, documentId: string): Promise<void> {
    return await this.getDocumentStream(collection, documentId).delete();
  }
}

