import { Router } from '@angular/router';
import { LivroService } from 'src/app/servicos/livro.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/Livro';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  isModal: boolean = false // quando false=não está mostrando o modal na tela

  idLivroParaExcluir!: any

  Livros: Livro[]

  constructor(private service: LivroService, private router: Router) {
    this.Livros = []
  }

  ngOnInit(): void {
    this.listarLivros()

  }

  listarLivros(){
    this.service.listar().subscribe({
      next: (resultado) => {console.log(resultado)
                            this.Livros = <any>resultado},
      error: (erro) => console.error(erro),
      complete: () => console.info('Lista completada')
    })
  }

  //função editar, ao clicar no botão editar, ele abre a rota editar/:id, que está no mesmo formulário, livro-form.html
  editar(id:any){
    this.router.navigate(['/editar/' + id])
  }

  //exclui o livro da lista ao confirmar a ação no modal
  confirmarAcao(){
    this.service.excluirLivro(this.idLivroParaExcluir).subscribe({
      next: (resultado) => {console.log("Livro excluído")
                            this.listarLivros()},
      error: (erro) => console.error(erro),
      complete: () => {console.info("Processo de exclusão completado")
                      this.isModal=false}
    })

  }

  //ao clicar no botão cancelar do modal, o modal some
  cancelarAcao(){
    this.isModal=false
  }

  //ao clicar no bot]ao excluir da lista mostra o modal
  mostrarModal(id:any){
    this.isModal = true //quando true = mostra modal
    this.idLivroParaExcluir = id
  }


}
