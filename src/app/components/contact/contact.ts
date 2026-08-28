import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  isSending = false;
  successMessage = '';
  errorMessage = '';

  sendEmail(form: NgForm): void {
  this.isSending = true;
  this.successMessage = '';
  this.errorMessage = '';

  emailjs.send(
    'service_0l8b809',
    'template_v4wjf4q',
    form.value,
    'niOMilC-h37LeMa9q'
  )
  .then(() => {
    this.isSending = false;
    this.successMessage = 'Message sent!';
    form.resetForm();
  })
 .catch((err) => {
  this.isSending = false;
  this.errorMessage = 'Failed to send message.';

  console.error('EmailJS Error:', err);
  console.error('Status:', err?.status);
  console.error('Text:', err?.text);
});
  }
}