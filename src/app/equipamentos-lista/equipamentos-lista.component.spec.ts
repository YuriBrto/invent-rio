import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentosListaComponent } from './equipamentos-lista.component';

describe('EquipamentosListaComponent', () => {
  let component: EquipamentosListaComponent;
  let fixture: ComponentFixture<EquipamentosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipamentosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipamentosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
