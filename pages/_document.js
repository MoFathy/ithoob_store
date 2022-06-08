import Document, { Head, Main, NextScript } from "next/document";

import $ from "jquery";
export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-180259772-1"
          ></script>
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
          <script src="https://checkout.tabby.ai/tabby-promo.js"></script>

          {/* <!-- Facebook Pixel Code --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window,document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1472277233167711'); 
                fbq('track', 'PageView');`,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" 
                src="https://www.facebook.com/tr?id=1472277233167711&ev=PageView
                &noscript=1"/>
                </noscript`,
            }}
          />
          {/* // <!-- End Facebook Pixel Code --> */}

          {/* <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(a,b,c,d,e,f,g,h){a.RaygunObject=e,a[e]=a[e]||function(){
              (a[e].o=a[e].o||[]).push(arguments)},f=b.createElement(c),g=b.getElementsByTagName(c)[0],
              f.async=1,f.src=d,g.parentNode.insertBefore(f,g),h=a.onerror,a.onerror=function(b,c,d,f,g){
              h&&h(b,c,d,f,g),g||(g=new Error(b)),a[e].q=a[e].q||[],a[e].q.push({
              e:g})}}(window,document,"script","//cdn.raygun.io/raygun4js/raygun.min.js","rg4js");
            `,
          }}
         />
         <script
         dangerouslySetInnerHTML={{
          __html:`rg4js('apiKey', 'lQqAwp8Mbfv1RY3fmHY94w');
            rg4js('enableCrashReporting', true);`,
          }}
          /> */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=0, shrink-to-fit=no"
          />
          <link rel="shortcut icon" href="../static/favicon.ico" />
          <meta
            name="google-site-verification"
            content="3t96ptZkAnuxTUJ0BtDVFlWp43EMVNpsE5cSQymyq9k"
          />
          <meta name="facebook-domain-verification" content="hu640epnz5p8jluhxoa2krqoior5q9" />
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
    );
  }
}
