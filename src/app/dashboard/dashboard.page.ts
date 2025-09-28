import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit, OnDestroy {

  userEmail = '';
  userCidade = '';
  userUf = '';

  umidade: number = 0;
  ultimaAtualizacao: string = '';

  private apiUrl = 'http://192.168.3.14:3000/api/sensor';
  private subscription!: Subscription;

  constructor(private http: HttpClient) {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.userCidade = localStorage.getItem('userCidade') || '';
    this.userUf = localStorage.getItem('userUf') || '';
  }

  ngOnInit() {
    // 🔄 Atualiza a cada 10 segundos
    this.subscription = interval(10000)
      .pipe(switchMap(() => this.http.get<any>(this.apiUrl)))
      .subscribe({
        next: (res) => {
          console.log('📥 Dados recebidos do sensor:', res);

          // 👇 acessando corretamente a estrutura da sua API
          if (res && res.recebido) {
            this.umidade = res.recebido.umidade;
            this.ultimaAtualizacao = new Date().toLocaleTimeString();
          }
        },
        error: (err) => {
          console.error('Erro ao buscar dados do sensor:', err);
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
