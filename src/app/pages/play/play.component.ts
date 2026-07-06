import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Placeholder for the original app's `/play` route.
 *
 * The original page embeds a full chess engine (chess.js + a custom
 * WASM engine) plus an AI chatbot that role-plays as the original
 * developer. Since that persona and chat backend are specific to the
 * original portfolio owner, it wasn't ported as-is. Replace this with
 * your own interactive feature, or port the chess engine separately
 * (see src/utils/redoxchessEngine.ts and api/chat.js in the original
 * repo) if you'd like to keep a similar feature under your own name.
 */
@Component({
  selector: 'app-play',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="myworks-page">
      <div class="myworks-header">
        <a routerLink="/" class="back-button" data-cursor="disable">&larr; Back to Home</a>
        <h1>Coming <span>Soon</span></h1>
        <p>
          This page is reserved for an interactive feature - the original
          template used a chess engine here. Let's build something that
          fits your own projects instead.
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayComponent {}
