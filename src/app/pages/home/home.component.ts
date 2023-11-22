import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private userService = inject(UserService)
  subscription!: Subscription
  firstUser: User | null = null

  ngOnInit(): void {
    this.subscription = this.userService.query().pipe(take(1)).subscribe({
      next: users => {
        this.firstUser = users[0];
      },
      error: err => console.log('err:', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe?.()
  }
}




