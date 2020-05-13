import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogprodutoComponent } from './logproduto.component';

describe('LogprodutoComponent', () => {
  let component: LogprodutoComponent;
  let fixture: ComponentFixture<LogprodutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogprodutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogprodutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
