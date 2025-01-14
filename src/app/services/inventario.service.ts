import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'http://localhost:3000/api/equipamentos';  // URL da API

  constructor(private http: HttpClient) {}

  // Método para obter todos os equipamentos
  getEquipamentos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para adicionar um novo equipamento
  addEquipamento(equipamento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, equipamento);
  }

  // Método para atualizar um equipamento existente
  updateEquipamento(id: number, equipamento: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, equipamento);
  }

  // Método para excluir um equipamento
  deleteEquipamento(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getEquipamentoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

}
