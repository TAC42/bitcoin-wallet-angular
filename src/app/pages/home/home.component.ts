import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {


  private contactService = inject(ContactService)
  subscription!: Subscription

  ngOnInit(): void {
    this.subscription = this.contactService.loadContacts()
      .pipe(take(1))
      .subscribe({
        error: err => console.log('err:', err)
      })
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe?.()
  }
}


