import { Component, HostListener, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'sayvan';
  isScrolled = false;
  isMenuOpen = false;

  contactData = {
    name: '',
    email: '',
    service: '',
    message: ''
  };
  
  showErrors = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    this.revealOnScroll();
  }

  ngAfterViewInit() {
    this.revealOnScroll();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.showErrors = true;
    
    if (this.contactData.name && this.contactData.email && this.contactData.message && this.contactData.service) {
      const subject = encodeURIComponent(`New Inquiry from ${this.contactData.name}`);
      const body = encodeURIComponent(
        `Name: ${this.contactData.name}\n` +
        `Email: ${this.contactData.email}\n` +
        `Service: ${this.contactData.service}\n\n` +
        `Message:\n${this.contactData.message}`
      );
      
      window.location.href = `mailto:sreenandannbr@gmail.com?subject=${subject}&body=${body}`;
      this.showErrors = false; // Reset errors on success
    } else {
      console.log('Form is invalid');
    }
  }
}

