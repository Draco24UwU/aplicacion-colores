import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modules-navbar-layout',
  imports: [RouterModule],
  template: `
    <nav
      class="bg-black text-white rounded-full p-4 w-[95%] mx-auto sticky shadow-2xl"
    >
      <ul class="flex items-center justify-start gap-4">
        <li class="hover:cursor-pointer group bg-white rounded-full">
          <a>
            <i
              class="fa-solid fa-list group-hover:scale-110 transition-all ease-in-out text-black p-2"
            ></i>
          </a>
        </li>
        <li><a routerLink="/app/home">Home</a></li>
        <li><a routerLink="/app/about">About</a></li>
      </ul>
    </nav>
  `,
})
export class ModulesNavbarLayoutComponent {}
