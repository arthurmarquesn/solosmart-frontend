import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class LoginPage {
  email: string = '';
  senha: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    if (!this.email || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    localStorage.setItem('userEmail', this.email);
    

    const payload = { email: this.email, senha: this.senha };

    this.http.post('http://localhost:3000/api/login', payload)
      .subscribe({
        next: (res: any) => {
          // Aqui você pode salvar token ou dados do usuário, se houver
          alert('Login realizado com sucesso!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erro no login:', err);
          alert('Email ou senha inválidos!');
        }
      });
  }

  
}
