import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  lastDateRender(modified: string, date: string) {
    const lastDate = modified?.length ? new Date(modified) : new Date(date);
    return lastDate.toLocaleDateString(navigator.language, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  dateRender(date: string) {
    const publishedDate = new Date(date);
    return publishedDate.toLocaleDateString(navigator.language, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
