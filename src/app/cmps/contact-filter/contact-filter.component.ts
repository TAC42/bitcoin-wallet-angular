import { Component, OnInit, inject } from '@angular/core';
import { ContactFilter } from '../../models/contact.model';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrl: './contact-filter.component.scss'
})
export class ContactFilterComponent implements OnInit {
  contactService = inject(ContactService)
  subscription!: Subscription

  filterBy!: ContactFilter
  filterSubject$ = new Subject()

  ngOnInit(): void {
    this.subscription = this.contactService.filterBy$
      .subscribe(filterBy => {
        this.filterBy = filterBy
      })

    this.filterSubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        console.log('set filter subscribe');
        this.contactService.setFilterBy(this.filterBy)
      })
  }


  onSetFilter(val: string) {
    this.filterSubject$.next(val)
    // this.petService.setFilterBy(this.filterBy)
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe?.()
  }
}


