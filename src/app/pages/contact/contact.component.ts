import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  contactService = inject(ContactService)
  subscription!: Subscription
  contacts$!: Observable<Contact[]>
  prm = Promise.resolve(99)

  ngOnInit(): void {
    this.subscription = this.contactService.loadContacts()
      .pipe(take(1))
      .subscribe({
        error: err => console.log('err:', err)
      })

    this.contacts$ = this.contactService.contacts$
  }


  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId)
      .subscribe({
        error: err => console.log('err:', err)
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}



