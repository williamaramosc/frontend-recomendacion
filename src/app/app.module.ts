// Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule} from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ToolbarModule} from 'primeng/toolbar';
import { TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterTestingModule } from '@angular/router/testing';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import {TabViewModule} from 'primeng/tabview';

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CardScoreBookComponent } from './shared/components/card-score-book/card-score-book.component';
import { LoginComponent } from './pages/login/login.component';
import { CardBookComponent } from './shared/components/card-book/card-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CardScoreBookComponent,
    LoginComponent,
    CardBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    RouterModule.forRoot([]),
    ToolbarModule,
    TableModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    TabViewModule,
    CardModule,
    BrowserAnimationsModule,
    InputNumberModule,
    CalendarModule,
    ConfirmDialogModule,
    CarouselModule,
    RatingModule
  ],
  providers: [RouterTestingModule, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
