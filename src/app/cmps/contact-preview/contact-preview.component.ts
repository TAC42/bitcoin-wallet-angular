import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrl: './contact-preview.component.scss'
})
export class ContactPreviewComponent {
  @Input() contact!: Contact
  @Output() remove = new EventEmitter()
  userImg = 'https://res.cloudinary.com/digrqdbso/image/upload/v1700657497/wo_lodbcw.png'
  

  onRemoveContact() {
    this.remove.emit(this.contact._id)
  }
}

