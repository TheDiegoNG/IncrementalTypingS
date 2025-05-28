import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  language = signal<Language>('English');
  constructor() { }
}


export type Language =
  | 'English'
  | 'Spanish'
  | 'French'
  | 'German'
  | 'Russian'
  | 'Japanese'
  | 'Arabic'
  | 'Amharic';
