import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;
  // activeTab = 'shopping';
  
  contactData = {
    name: '',
    email: '',
    phone: '',
    time: '',
    message: ''
  };
  
  showErrors = false;
  formSubmitted = false;

  amenities: any = {
    grocery: [
      { name: "Trader Joe's", distance: "5 min walk", desc: "Popular grocery destination with high-quality selections.", icon: "shopping_cart" },
      { name: "Whole Foods Market", distance: "10 min walk", desc: "Premium organic produce and gourmet ingredients.", icon: "shopping_cart" },
      { name: "City Point BKLYN", distance: "8-10 min walk", desc: "Retail center with Trader Joe's, Target, DeKalb Market Hall.", icon: "shopping_cart" }
    ],
    dining: [
      { name: "DeKalb Market Hall", distance: "8 min walk", desc: "Showcasing 40 local vendors with diverse cuisines.", icon: "restaurant" },
      { name: "Junior's Restaurant", distance: "5 min walk", desc: "Famous for legendary cheesecake and comfort food.", icon: "restaurant" },
      { name: "Shake Shack", distance: "12 min walk", desc: "Spacious venue for delicious burgers and shakes.", icon: "restaurant" }
    ],
    transportation: [
      { name: "Hoyt-Schermerhorn", distance: "4 min walk", desc: "A/C/G subway lines for quick access to Manhattan.", icon: "train" },
      { name: "DeKalb Ave Station", distance: "7 min walk", desc: "B/Q/R subway lines for Brooklyn and City access.", icon: "train" },
      { name: "Atlantic Terminal", distance: "15 min walk", desc: "Major transit hub with LIRR and multiple subways.", icon: "train" }
    ],
    education: [
      { name: "LIU Brooklyn", distance: "10 min walk", desc: "Prominent private university with diverse programs.", icon: "school" },
      { name: "NYU Tandon", distance: "12 min walk", desc: "World-class engineering and technology school.", icon: "school" },
      { name: "Brooklyn Tech", distance: "15 min walk", desc: "Top-tier specialized public high school.", icon: "school" }
    ],
    hospital: [
      { name: "Brooklyn Hospital", distance: "8 min walk", desc: "Comprehensive medical center serving the community.", icon: "local_hospital" },
      { name: "CityMD Urgent Care", distance: "5 min walk", desc: "Quick access for non-emergency medical needs.", icon: "local_hospital" }
    ],
    parks: [
      { name: "Fort Greene Park", distance: "12 min walk", desc: "Historic park with tennis courts and weekly markets.", icon: "park" },
      { name: "Brooklyn Bridge Park", distance: "20 min walk", desc: "Iconic waterfront park with stunning city views.", icon: "park" },
      { name: "Cadman Plaza", distance: "10 min walk", desc: "Spacious green area perfect for morning walks.", icon: "park" }
    ]
  };

  activeTab: string = 'grocery';

  team = [
    {
      name: 'Alexander Thorne',
      role: 'Principal Architect',
      image: 'https://images.unsplash.com/photo-1600880210119-75ee99bb4823?auto=format&fit=crop&q=80&w=600',
      desc: 'With over 15 years of experience, Alexander leads our architectural vision with a focus on sustainable luxury.'
    },
    {
      name: 'Sophia Chen',
      role: 'Lead Interior Designer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      desc: 'Sophia specializes in creating harmonious indoor environments that blend functionality with timeless aesthetics.'
    },
    {
      name: 'Marcus Vane',
      role: 'Structural Engineer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
      desc: 'Marcus ensures every structure we build is not only beautiful but engineered to the highest standards of safety.'
    }
  ];

  ngOnInit() {
    this.checkScroll();
    setTimeout(() => this.initReveal(), 100);
    this.startAutoScroll();
  }

  startAutoScroll() {
    setInterval(() => {
      const slider = document.querySelector('.gallery-slider');
      if (slider) {
        const scrollAmount = 570; // item width + gap
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4000);
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 50;
    this.initReveal();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.contactData.name && this.contactData.email) {
      this.formSubmitted = true;
      console.log('Form Submitted:', this.contactData);
      setTimeout(() => {
        this.formSubmitted = false;
        this.contactData = { name: '', email: '', phone: '', time: '', message: '' };
        this.showErrors = false;
      }, 3000);
    } else {
      this.showErrors = true;
    }
  }

  initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((element: any) => {
      const windowHeight = window.innerHeight;
      const revealTop = element.getBoundingClientRect().top;
      const revealPoint = 100;
      if (revealTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }
}
