import { Component, OnInit } from '@angular/core';

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
  public _SelectedValue: number = 0
  public _Valor: number = 0
  public _Total: number = 0
  public _ValorJurosCartao: number = 0
  public _ValorJurosParcela: number = 0
  public _TotalParcelas: number = 0

  ngOnInit(){
  }
  
  constructor() {
    for(let i = 1; i < 13; i++)
    this._Parcelas.push(i)
    this._JurosCartao = 2.99
    this._JurosParcela = 3.49
  }

  private ClearValues(): void{
    this._ValorJurosCartao = 0
    this._ValorJurosParcela = 0
    this._Total = 0
  }

  public CalcTabelaPrice(valor: number, juros: number, meses: number): number{
    juros = juros / 100
    let parecela = valor * juros / (1 - 1 / (1 + juros) ** meses)
    return parecela * meses
  }

  public Calcular(): void{
    let valorboleto = this.CalcTabelaPrice(this._Valor, this._JurosCartao, 1)
    let parecela = this.CalcTabelaPrice(valorboleto, this._JurosParcela, parseInt(this._SelectedValue.toString()))

    this._Total = parecela 
    this._TotalParcelas = parecela / this._SelectedValue
  }
}
