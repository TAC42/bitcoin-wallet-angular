import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { delay, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const contactResolver: ResolveFn<Contact> = (route, state) => {
  const id = route.params['id']
  const loaderService = inject(LoaderService);
  loaderService.setIsLoading(true)
  return inject(ContactService).getContactById(id)
      .pipe(
          delay(500),
          tap(() => loaderService.setIsLoading(false))
      )
}

