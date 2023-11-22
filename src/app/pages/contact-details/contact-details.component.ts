import { Component, OnInit, inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Contact } from '../../models/contact.model'
import { ContactService } from '../../services/contact.service'

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact | null = null;
  private route = inject(ActivatedRoute)
  private contactService = inject(ContactService)


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const contactId = params.get('id')
      if (contactId) {
        this.contactService.getContactById(contactId).subscribe(
          contact => {
            this.contact = contact
          },
          error => {
            console.error('Error fetching contact:', error)
          }
        )
      }
    })
  }
}
