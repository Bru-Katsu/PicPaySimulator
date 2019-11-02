import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PicPaySimulator';

  private readonly _JurosCartao: number = 0
  private readonly _JurosBoleto: number = 0
  private readonly _JurosParcela: number = 0
  public readonly _Parcelas: number[] = new Array()
  public _SelectedValue: number = 0
  public _Valor: number = 0
  public _Total: number = 0
  public _Percentual: number = 0
  public _ValorJurosBoleto: number = 0
  public _ValorJurosCartao: number = 0
  public _ValorJurosParcela: number = 0
  public _ValorPorParcela: number = 0
  public _Desconto: number = 0
  public _Desconto2: number = 0

  ngOnInit(){
  }
  
  constructor() {
    for(let i = 1; i < 13; i++)
    this._Parcelas.push(i)
    this._Desconto2 = 1.00
    this._JurosBoleto = 2.99
    this._JurosCartao = 2.99
    this._JurosParcela = 3.49
  }

  private ClearValues(): void{
    this._ValorJurosBoleto = 0
    this._ValorJurosCartao = 0
    this._ValorPorParcela = 0
    this._ValorJurosParcela = 0
    this._Total = 0
  }

  public Calcular(): void{
    this.ClearValues()
    this._ValorJurosBoleto = (this._Valor * this._JurosBoleto)/100
    this._ValorJurosCartao = (this._Valor * this._JurosCartao)/100
    this._ValorPorParcela = ((this._Valor + this._ValorJurosCartao + this._ValorJurosBoleto)/ this._SelectedValue)

    this._ValorJurosParcela = ( this._ValorPorParcela * this._JurosParcela)/100

    this._Desconto = ((this._ValorPorParcela + this._ValorJurosParcela) * this._Desconto2)/100 
    this._Total = ((this._ValorPorParcela + this._ValorJurosParcela) - this._Desconto) * this._SelectedValue
  }
}
