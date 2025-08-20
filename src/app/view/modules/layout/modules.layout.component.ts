import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModulesNavbarLayoutComponent } from './components/modules-navbar.layout.component';

@Component({
  selector: 'app-modules-layout',
  imports: [RouterOutlet, ModulesNavbarLayoutComponent],
  template: `
    <section class="p-5">
      <header>
        <app-modules-navbar-layout />
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </section>
  `,
})
export class ModulesLayoutComponent {}
