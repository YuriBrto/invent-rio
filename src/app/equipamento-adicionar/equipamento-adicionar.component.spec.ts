import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoAdicionarComponent } from './equipamento-adicionar.component';

describe('EquipamentoAdicionarComponent', () => {
  let component: EquipamentoAdicionarComponent;
  let fixture: ComponentFixture<EquipamentoAdicionarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipamentoAdicionarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipamentoAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
