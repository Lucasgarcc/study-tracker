import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Topic } from '../store/models/topic.model';

@Injectable({
  providedIn: 'root',
})
export class Topics {
  
    private readonly http = inject(HttpClient);
    private readonly URL = 'http://localhost:3000/topics';

    /**
     * 
     * @returns 
     */
    getTopics(): Observable<Topic[]> {

        return this.http.get<Topic[]>(this.URL)
        .pipe(
            map((topics: Topic[]) => topics || []),
            catchError((error: HttpErrorResponse) => {
                console.error('Error interceptado no serviço', error.message);
                return throwError(() => new Error('Falha ao carregar os dados. Tente '))
            })
        )
    };

    /**
     * 
     * @returns 
     */
    loadTopics(): Observable<Topic[]> {
        return this.getTopics();
    };

    /**
     * 
     * @param topic 
     * @returns 
     */
    addTopic(topic: Omit<Topic, 'id'>): Observable<Topic> {
        return this.http.post<Topic>(this.URL, topic);
    };

    /**
     * 
     * @param id 
     * @returns 
     */
    deleteTopic(id: string): Observable<void> {
        return this.http.delete<void>(
            `${this.URL}/${encodeURIComponent(id)}`
        );
    };
}
