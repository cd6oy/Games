/* eslint-env es6 */

import few from 'few';
import '//raw.githubusercontent.com/soyjavi/vanilla-terminal/master/dist/vanilla-terminal';
import '//cdn.jsdelivr.net/npm/skulpt@1.0.0/dist/skulpt.min';
import '//cdn.jsdelivr.net/npm/skulpt@1.0.0/dist/skulpt-stdlib';

class PythonView extends HTMLElement {
    static get tag() {
        return 'py-view';
    }

    static get observedAttributes() {
        return [ 'src' ];
    }

    constructor() {
        super();

        // const shadowRoot = this.shadowRoot || this.attachShadow( { mode: 'open' } );

        // Apply style to shadow DOM
       const style = document.createElement( 'style' );
        style.textContent = `

      #vanilla-terminal {
        /*
        width: 100vw;
        height: 100vh;
        */
        width: 600px;
        height:400px;
      }
      .VanillaTerm .container {
        margin: unset;
      }
      .py-view-hide {
        display: none
      }
        `;
        this.appendChild( style );
        this._contentDOM = document.createElement( 'div' );
        this._contentDOM.innerHTML = `
            <div id="vanilla-terminal" class="py-view-hide"></div>
            <div id="mycanvas"></div>
        `;
        this.appendChild( this._contentDOM );

        // Add highlightJs css
        // <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.15.10/build/styles/default.min.css">
        let terminalCss = document.createElement( 'link' );
        terminalCss.rel = 'stylesheet';
        terminalCss.href = 'css/github.css';
        // terminalCss.href = 'https://cdn.jsdelivr.net/npm/jquery.terminal@2.20.1/css/jquery.terminal.min.css';
        this.appendChild( terminalCss );
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        // console.log( `${name}: ${oldValue} => ${newValue}` );

        if ( name === 'src' && newValue && oldValue !== newValue ) {
            // this._contentDOM.innerHTML = `<div>${newValue}</div>`;
            // do nothing
            few.httpGet( `${newValue}.py` ).then( ( content ) => {
                // terminal setup
                const term = new VanillaTerminal({
                  commands: {
                    flavour: (terminal) => {
                      terminal.output('There is only one flavour for your favorite🍦and it is <b>vanilla<b>.')
                      // terminal.setPrompt('@soyjavi <small>❤️</small> <u>vanilla</u> ');
                    },
                    async: (terminal) => {
                      terminal.idle();
                      setTimeout(() => terminal.output('Async 300'), 300);
                      setTimeout(() => terminal.output('Async 1300'), 1300);
                      setTimeout(() => {
                        terminal.output('Async 2000');
                        terminal.setPrompt();
                      }, 2000);
                    },
                  },
                  welcome: '',
                  // prompt: 'soyjavi at <u>Macbook-Pro</u> ',
                  separator: '>>>',
                  // container: this._contentDOM
                });

                /*
                term.onInput((command, parameters) => {
                  console.log('⚡️onInput', command, parameters);
                });
                */

                // python
                function builtinRead(x) {
                    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                            throw "File not found: '" + x + "'";
                    return Sk.builtinFiles["files"][x];
                }

                (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';

                Sk.configure({
                    output: text => {
                        this._contentDOM.firstElementChild.classList.remove('py-view-hide')
                        term.output(text);
                    },
                    read:builtinRead,
                    inputfun: () => {
                        return new Promise( ( resolve, reject ) => {
                            term.prompt('', (val) => resolve(val));
                        });
                    },
                    __future__: Sk.python3
                });


                var myPromise = Sk.misceval.asyncToPromise(function() {
                    return Sk.importMainWithBody("<stdin>", false, content, true);
                });
                myPromise.then(function(mod) {
                    console.log('success');
                }, function(err) {
                    console.log(err.toString());
                });

                //////////////////
            } );

            // try append dom

      /*
      term.prompt('Your name', (name) => {
        term.output(`Hi ${name}!`);
        term.setPrompt(`${name} `);
      });
      */

        }
    }
}

customElements.define( PythonView.tag, PythonView );
