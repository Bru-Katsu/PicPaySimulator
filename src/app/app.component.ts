import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Inputmask from "inputmask"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PicPaySimulator';

  private readonly _JurosCartao: number = 0
  private readonly _JurosParcela: number = 0
  public readonly _Parcelas: number[] = new Array()
  public _ValorSelecionado: number = 1
  public _Saldo: number
  public _bHasZeroSaldo: boolean = false
  public _Valor: number
  public _Total: number = 0
  public _ValorJurosCartao: number = 0
  public _ValorJurosParcela: number = 0
  public _TotalParcelas: number = 0
  public _Form: FormGroup

  ngOnInit(){
    this.validation()
    Inputmask().mask(document.querySelectorAll("input"));
  }
  
  constructor(private _FormBuilder: FormBuilder) {
    for(let i = 1; i < 13; i++)
    this._Parcelas.push(i)
    this._JurosCartao = 2.99
    this._JurosParcela = 3.49
  }

  private validation(){
    this._Form = this._FormBuilder.group({
      saldo: ['', [Validators.min(0.01)]],
      valor:['', [Validators.required, Validators.min(0.01), Validators.max(5000)]],
      parcelas: [1, [Validators.required, Validators.min(1)]]
    })
  }

  private CalcTabelaPrice(valor: number, juros: number, meses: number): number{
    juros = juros / 100
    let parecela = valor * juros / (1 - 1 / (1 + juros) ** meses)
    return parecela * meses
  }

  private InitValues(): void{
    this._bHasZeroSaldo = this._Saldo == undefined ? true : false
    if(this._bHasZeroSaldo)
      this._Saldo = 0
  }

  private DefaultValues(): void{
    this._Saldo = undefined
    this._bHasZeroSaldo = false
  }

  public Calcular(): void{
    this.InitValues()
    let valorboleto = this.CalcTabelaPrice(this._Valor - this._Saldo, this._JurosCartao, 1)
    let parcela = this.CalcTabelaPrice(valorboleto, this._JurosParcela, parseInt(this._ValorSelecionado.toString()))

    this._Total = parcela 
    this._TotalParcelas = parcela / this._ValorSelecionado
    this.DefaultValues()
  }
}
