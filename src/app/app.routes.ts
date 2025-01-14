// app.routes.ts
import { Routes } from '@angular/router';
import { EquipamentosListaComponent } from './equipamentos-lista/equipamentos-lista.component';
import { EquipamentoAdicionarComponent } from './equipamento-adicionar/equipamento-adicionar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/equipamentos', pathMatch: 'full' },
  { path: 'equipamentos', component: EquipamentosListaComponent },
  { path: 'adicionar-equipamento', component: EquipamentoAdicionarComponent },
  { path: 'equipamento-editar/:id', component: EquipamentoAdicionarComponent }
];
