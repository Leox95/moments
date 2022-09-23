import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl

  //todo search


  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
      this.momentService.getMoments().subscribe((itens)=>{
        const data = itens.data

        data.map((item)=>{
          item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR')
        })

        this.allMoments = data
        this.moments = data

      })

  }

  search(e: Event):void{
    //pegando o valor do input
    const target = e.target as HTMLInputElement
    const value = target.value

    //filtrando valores
    this.moments = this.allMoments.filter((moments) => {
    return moments.title.toLowerCase().includes(value)})

  }

}
