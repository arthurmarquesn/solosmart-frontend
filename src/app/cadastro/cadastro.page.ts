import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class CadastroPage {
  email = '';
  senha = '';
  senha2 = '';
  uf = '';
  cidade = '';

  // Siglas das UFs
  ufs: string[] = [
    'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
    'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
    'RS','RO','RR','SC','SP','SE','TO'
  ];

  // Exemplo de cidades
  cidades: string[] = [
    'São Paulo','Rio de Janeiro','Belo Horizonte','Salvador','Fortaleza',
    'Curitiba','Porto Alegre','Recife','Belém','Manaus'
  ];

  constructor(private router: Router, private http: HttpClient) {}

  cadastrar() {
    // Validação básica
    if (!this.email || !this.senha || !this.senha2 || !this.uf || !this.cidade) {
      alert('Preencha todos os campos!');
      return;
    }
    localStorage.setItem('userEmail', this.email);
    localStorage.setItem('userCidade', this.cidade);

    if (this.senha !== this.senha2) {
      alert('As senhas não conferem!');
      return;
    }

    // Monta payload
    const payload = {
      email: this.email,
      senha: this.senha,
      uf: this.uf,
      cidade: this.cidade
    };

    // Envia para o backend
    this.http.post('http://localhost:3000/api/users', payload)
      .subscribe({
        next: (res: any) => {
          alert(res.message || 'Cadastro realizado com sucesso!');
          this.router.navigate(['/dashboard']); // Redireciona após cadastro
        },
        error: (err) => {
          console.error('Erro no cadastro:', err);
          alert(err.error?.message || 'Erro ao cadastrar usuário');
        }
      });
  }
}
