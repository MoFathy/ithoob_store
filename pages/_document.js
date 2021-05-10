import Document, { Head, Main, NextScript } from 'next/document';

import $ from "jquery";
export default class MyDocument extends Document {
 render () {
   return (
     <html>
       <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-180259772-1"></script>
          <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
      
              gtag('config', 'UA-180259772-1');
            `,
          }}
         />
          <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=0, shrink-to-fit=no"/>
          <link rel="shortcut icon" href="../static/favicon.ico" />
          <meta name="google-site-verification" content="3t96ptZkAnuxTUJ0BtDVFlWp43EMVNpsE5cSQymyq9k" />
        </Head>
       <body>
         <Main />
         <NextScript />
         {/* <script async src="https://www.googletagmanager.com/gtag/js?id=UA-180259772-1"></script>
         <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
      
              gtag('config', 'UA-180259772-1');
            `,
          }}
         /> */}
       </body>
     </html>
   )
 }
}
