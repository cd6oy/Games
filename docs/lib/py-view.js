/* eslint-env es6 */

import few from 'few';
import '//cdn.jsdelivr.net/npm/jquery.terminal@2.20.1/js/jquery.terminal.min';

marked.setOptions( {
    langPrefix: 'language-',
    highlight: function( code, lang ) {
        return hljs.highlight( lang, code ).value;
    }
} );
class PythonView extends HTMLElement {
    static get tag() {
        return 'py-view';
    }

    static get observedAttributes() {
        return [ 'src' ];
    }

    constructor() {
        super();

        const shadowRoot = this.shadowRoot || this.attachShadow( { mode: 'open' } );

        // Apply style to shadow DOM
        const style = document.createElement( 'style' );

        this._contentDOM = document.createElement( 'div' );
        shadowRoot.appendChild( style );
        shadowRoot.appendChild( this._contentDOM );

        // Add highlightJs css
        // <link rel="stylesheet" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.15.10/build/styles/default.min.css">
        let terminalCss = document.createElement( 'link' );
        hightlightCss.rel = 'stylesheet';
        hightlightCss.href = 'https://cdn.jsdelivr.net/npm/jquery.terminal@2.20.1/css/jquery.terminal.min.css';
        shadowRoot.appendChild( hightlightCss );


        hljs.initHighlightingOnLoad();
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        // console.log( `${name}: ${oldValue} => ${newValue}` );

        if ( name === 'src' && newValue && oldValue !== newValue ) {
            // do nothing
            few.httpGet( `${newValue}.md` ).then( ( content ) => {
                this._contentDOM.innerHTML = marked( content );
            } );
        }
    }
}

customElements.define( PythonView.tag, PythonView );
