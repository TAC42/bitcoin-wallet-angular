import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {
  @Input() contacts!: Contact[] | null
  @Output() remove = new EventEmitter()

  ngOnInit(): void {
    console.log('this.contacts:', this.contacts)
  }

}
