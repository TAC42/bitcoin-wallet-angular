import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  contactService = inject(ContactService)
  // subscription!: Subscription
  // contacts!: Contact[]
  contacts$!: Observable<Contact[]>
  prm = Promise.resolve(99)

  ngOnInit(): void {
    this.contacts$ = this.contactService.contacts$
    // this.subscription = this.contactService.contacts$
    //     .subscribe(contacts => {
    //         this.contacts = contacts
    //     })
  }

  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId)
      .subscribe({
        error: err => console.log('err:', err)
      })
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe()
  }
}



