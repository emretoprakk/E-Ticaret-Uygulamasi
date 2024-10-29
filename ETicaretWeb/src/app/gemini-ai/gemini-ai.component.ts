import { Component, inject } from '@angular/core';
import { GeminiService } from '../services/gemini/gemini.service';

@Component({
  selector: 'app-gemini-ai',
  templateUrl: './gemini-ai.component.html',
  styleUrls: ['./gemini-ai.component.scss']
})
export class GeminiAiComponent {

  prompt: string = '';
  geminiService: GeminiService = inject(GeminiService);
  loading: boolean = false;
  chatHistory: any[] = [];

  constructor(){
    this.geminiService.getMessageHistory().subscribe((res)=> {
      if(res) {
        this.chatHistory.push(res);
      }
    })
  }

  async sendData() {
    if (this.prompt && !this.loading) {
        this.loading = true;
        const userMessage = this.prompt;
        this.prompt = '';
        await this.geminiService.generateText(userMessage);
        this.loading = false;
    }
}


  formatText(text: string) {
    const result = text.replaceAll('*','');
    return result;
  }


}
