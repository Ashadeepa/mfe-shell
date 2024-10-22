import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, OnInit, ElementRef } from '@angular/core';
import React  from 'react';
import { createRoot } from 'react-dom/client';

@Component({
  selector: 'app-react-app',
  standalone: true,
  imports: [],
  template: '<div id="react-root"></div>',
  styleUrl: './react-app.component.css'
})
export class ReactAppComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  async ngOnInit() {
    // Dynamically load the remote React component
    const { default: MyReactComponent } = await loadRemoteModule({
      remoteEntry: 'http://localhost:3000/remoteEntry.js',
      remoteName: 'reactApp',
      exposedModule: './App', // Ensure the path matches where App.js is exposed
    });

    // Render the React component inside the Angular template's react-root div
    const root = createRoot(this.elementRef.nativeElement.querySelector('#react-root'));
    root.render(React.createElement(MyReactComponent));
    console.log('ReactAppComponent created');
  }

}
