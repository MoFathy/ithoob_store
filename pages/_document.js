import Document, { Head, Main, NextScript } from "next/document";

import $ from "jquery";
export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          {/* <script
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
          /> */}
          {/* <!-- Google Tag Manager --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WR8Q4HR');`,
            }}
          />

          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WR8Q4HR"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />

          {/* collect users Cookies */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(){
                var cookieName = "visitorOfTheWebsite"; // Name of your cookie
                var cookieValue = "website visitor name"; // Value of your cookie
                var expirationTime = 2592000; // One month in seconds
                expirationTime = expirationTime * 1000; // Converts expirationTime to milliseconds
                var date = new Date(); 
                var dateTimeNow = date.getTime();
                date.setTime(dateTimeNow + expirationTime); // Sets expiration time (Time now + one month)
                var date = date.toUTCString(); // Converts milliseconds to UTC time string
                document.cookie = cookieName+"="+cookieValue+"; SameSite=None; Secure; expires="+date+"; path=/; domain=." + location.hostname.replace(/^www\./i, ""); // Sets cookie for all subdomains
               })();`,
            }}
          />
          {/* <!-- End Google Tag Manager (noscript) --> */}
          {/* <!-- End Google Tag Manager --> */}
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
                &noscript=1"/>`,
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
          {/* !-- Twitter universal website tag code --> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
                a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                // Insert Twitter Pixel ID and Standard Event data below
                twq('init','o99ln');
                twq('track','PageView');`,
            }}
          />
          {/* <!-- End Twitter universal website tag code --> */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=0, shrink-to-fit=no"
          />
          <link rel="shortcut icon" href="../static/favicon.ico" />
          <meta
            name="google-site-verification"
            content="3t96ptZkAnuxTUJ0BtDVFlWp43EMVNpsE5cSQymyq9k"
          />
          <meta
            name="facebook-domain-verification"
            content="hu640epnz5p8jluhxoa2krqoior5q9"
          />
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
