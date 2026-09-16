import { Component, AfterViewInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements AfterViewInit {

  isSending = false;
  successMessage = '';
  errorMessage = '';

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            } else {
              entry.target.classList.remove('in-view');
            }
          });
        }, {
          threshold: 0.05,
          rootMargin: '0px 0px -25px 0px'
        });

        const elements = document.querySelectorAll('#contact .reveal-left, #contact .reveal-right');
        elements.forEach(el => observer.observe(el));
      }, 50);
    }
  }

  async sendEmail(form: NgForm): Promise<void> {
    this.isSending = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
      const emailjsModule = await import('@emailjs/browser');
      const emailjs = emailjsModule.default || emailjsModule;

      await emailjs.send(
        'service_0l8b809',
        'template_v4wjf4q',
        form.value,
        'niOMilC-h37LeMa9q'
      );
      this.isSending = false;
      this.successMessage = 'Message sent!';
      form.resetForm();
    } catch (err: any) {
      this.isSending = false;
      this.errorMessage = 'Failed to send message.';
      console.error('EmailJS Error:', err);
      console.error('Status:', err?.status);
      console.error('Text:', err?.text);
    }
  }
}