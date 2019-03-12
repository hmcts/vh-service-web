import { routes } from './app-routing.module';
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('app routing',
  () => {
    let location: Location;
    let router: Router;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, RouterTestingModule.withRoutes(routes), FormsModule],
        declarations: [
          AppComponent,
          HeaderComponent,
          FooterComponent
        ],
        providers: [
          HttpClient,
          HttpHandler
        ],
      }).compileComponents();

      router = TestBed.get(Router);
      location = TestBed.get(Location);
    });
  });
