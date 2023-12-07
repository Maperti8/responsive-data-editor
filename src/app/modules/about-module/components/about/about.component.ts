import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  onGithub() {
    window.open("https://github.com/Maperti8/Llama2-custom-chatbot")
  }

  onLinkedin() {
    window.open("https://www.linkedin.com/in/martin-pekny-33560b176/")
  }
 
}
