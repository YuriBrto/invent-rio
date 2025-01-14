import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../services/inventario.service';
import { Router, RouterModule } from '@angular/router'; // Importar o Router para navegação
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-equipamentos-lista',
  templateUrl: './equipamentos-lista.component.html',
  styleUrls: ['./equipamentos-lista.component.scss'],
  imports :[CommonModule , RouterModule]
})
export class EquipamentosListaComponent implements OnInit {
  equipamentos: any[] = [];

  constructor(
    private inventarioService: InventarioService,
    private router: Router // Injetando o serviço Router
  ) {}

  ngOnInit(): void {
    this.obterEquipamentos();
  }

  obterEquipamentos(): void {
    this.inventarioService.getEquipamentos().subscribe(
      (data) => {
        console.log('Dados recebidos:', data);
        // Verifica se a resposta é um objeto e converte para array
        this.equipamentos = Array.isArray(data) ? data : Object.values(data);
      },
      (error) => {
        console.error('Erro ao carregar equipamentos:', error);
      }
    );
  }



  editarEquipamento(id: number): void {
    // Navegar para o componente de edição passando o ID do equipamento
    this.router.navigate([`/equipamento-editar/${id}`]);
  }

  excluirEquipamento(id: number): void {
    this.inventarioService.deleteEquipamento(id).subscribe(
      (data) => {
        console.log('Equipamento excluído', data);
        this.obterEquipamentos();  // Atualiza a lista de equipamentos
      },
      (error) => {
        console.error('Erro ao excluir equipamento:', error);
      }
    );
  }
}
