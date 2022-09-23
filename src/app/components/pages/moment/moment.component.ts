import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { ActivatedRoute, Router } from '@angular/router'; 
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { Coment } from 'src/app/Coment';
import { FormGroup, FormGroupDirective, Validators, FormControl } from '@angular/forms';
import { ComentService } from 'src/app/services/coment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl

  comentForm!: FormGroup;


  constructor(
    private momentSevice: MomentService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private comentService: ComentService) { }

  ngOnInit(): void {
    //pegando o id da url
    const id = Number(this.route.snapshot.paramMap.get('id'))

    //atribuindo dados do service na variavel moment
    this.momentSevice.getMoment(id).subscribe((item) => (this.moment = item.data))

    //criando FormGroup
    this.comentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('',[Validators.required])
    })
  }

  get text(){
    return this.comentForm.get('text')!;
  }
  get username(){
    return this.comentForm.get('username')!;
  }

  async  remover(id: number){
    await  this.momentSevice.removerMomento(id).subscribe()

    this.messageService.add('Momento excluído com sucesso')

    this.router.navigate(['/'])


  }

  async onSubmit(formDirective: FormGroupDirective){
    //validando se o form foi preenchido
    if(this.comentForm.invalid){
      return
    }
    // criando variável para receber o valor do form
    const data: Coment = this.comentForm.value
    //convertendo o id em número porque a tipagem exige
    data.momentId = Number(this.moment!.id)
    //inserindo dados do fomulário no service
    await this.comentService.createComment(data)
    .subscribe((comentario)=> this.moment!.comments!.push(comentario.data))

    //inserindo mensagem de êxito
    this.messageService.add('O comentário foi adicionado')

    //resetando formulário
    this.comentForm.reset()
    formDirective.reset()
  }


}
