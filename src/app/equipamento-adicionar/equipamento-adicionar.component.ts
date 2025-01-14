import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importando o FormsModule para vinculação de dados com o ngModel
import { HttpClientModule } from '@angular/common/http';  // Importando o HttpClientModule
import { RouterModule } from '@angular/router';  // Importando o RouterModule para navegação
import { InventarioService } from '../services/inventario.service';  // Serviço de inventário

@Component({
  selector: 'app-equipamento-adicionar',
  templateUrl: './equipamento-adicionar.component.html',
  styleUrls: ['./equipamento-adicionar.component.scss'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule]  // Importando os módulos necessários
})
export class EquipamentoAdicionarComponent implements OnInit {
  equipamento = {
    tipo: '',
    setor: '',
    usuario: '',
    memoria_ram: '',
    armazenamento: '',
    id_teamviewer: '',
    sistema_operacional: '',
    versao: ''
  };
  isEditMode: boolean = false;  // Flag para identificar se estamos em modo de edição
  equipamentoId: number | null = null;

  constructor(
    private inventarioService: InventarioService,  // Injetando o serviço de inventário
    private router: Router,  // Injetando o serviço de roteamento para navegação
    private route: ActivatedRoute  // Para acessar os parâmetros da URL
  ) {}

  ngOnInit(): void {
    // Verificar se a URL contém o id do equipamento para edição
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.equipamentoId = +id;  // Converter o id para número
      this.carregarEquipamento(this.equipamentoId);
    }
  }

  carregarEquipamento(id: number): void {
    this.inventarioService.getEquipamentoById(id).subscribe(
      (response) => {
        console.log('Dados carregados para edição:', response);
        this.equipamento = response;  // Preencher o formulário com os dados do equipamento
      },
      (error) => {
        console.error('Erro ao carregar equipamento:', error);
      }
    );
  }

  // Função que é chamada quando o formulário é submetido
  adicionarEquipamento(): void {
    if (this.isEditMode && this.equipamentoId !== null) {
      // Se estamos em modo de edição, atualizar o equipamento
      this.inventarioService.updateEquipamento(this.equipamentoId, this.equipamento).subscribe(
        (response) => {
          console.log('Equipamento editado com sucesso:', response);
          this.router.navigate(['/equipamentos']);  // Navegar de volta para a lista de equipamentos
        },
        (error) => {
          console.error('Erro ao editar equipamento:', error);
        }
      );
    } else {
      // Se estamos em modo de criação, adicionar um novo equipamento
      this.inventarioService.addEquipamento(this.equipamento).subscribe(
        (response) => {
          console.log('Equipamento adicionado com sucesso:', response);
          this.router.navigate(['/equipamentos']);  // Navegar de volta para a lista de equipamentos
        },
        (error) => {
          console.error('Erro ao adicionar equipamento:', error);
        }
      );
    }
  }


}
