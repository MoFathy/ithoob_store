## Getting Started
- `git clone https://elharonywk@bitbucket.org/webkeyz/ithoob-next.git`
- `cd ithoob-next`
- `npm install`
- `npm run dev`

## Deployment
- Login via SSL from your Terminal: `ssh wknode@173.199.166.52 -p37241`
- Type the password: `jJ=5>hV#e>iF`
- Go to our Staging Directory `cd public_html/ithoob/v2/`
- Create a new build: `npm run build` - In case you've added a new package (updated the `package.json` file), you will need to run `npm install` first to install the new package(s), then build!
- `pm2 restart Frontend` - To restart our Frontend Site Server (i.e. `server.js` file)

> Note: `Frontend` is just a name we set for our Frontend Site. So, it's not a built-in name in `pm2`!

## Migration
Migration means hosting our site on a different host, we "migrate" it from its current server to another

### Server Port
Be aware that after transferring your files, the node server mightn't work. That's why you need update our port to the new server's allowed port (that connects with the sub-domain you're using):

- In `htaccess`, update the `PORT_NUMBER` with your allowed port, as follows:
```apacheconf 
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule ^$ http://127.0.0.1:PORT_NUMBER/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:PORT_NUMBER/$1 [P,L]
</IfModule>
```

- In `server.js`, update the `PORT_NUMBER` as follows:	
```js
server.listen(PORT_NUMBER, err => {
    if (err) throw err;
});
```

### Next.js & API Configuration 
You will find a sample Next.js configuration file called `next-sample.config.js`, all you need to do is:
- Rename it to `next.config.js`
- Update the API Endpoint Environment Variable:
```json
endpoint: "NEW_API_ENDPOINT"
```

## Useful Tips
- We run `npm run dev` locally to start our local server. Once we close our Terminal/VSCode or the whole Laptop, the website will be down. The way to keep our server running continously, is using a Process Manager, that's why we use `pm2` to keep our node server running!
- `pm2 list` shows all processes
- `pm2 show processName/processID` to see more details about a specific process
- `pm2 restart processName/processID` to restart the process


## iThoob3 / JZL
- [Yahya] Content Update
    ithoob
        footer
    jzl
        footer
- [Mai] Null Issue
- [Yahya] Fix Null Issue
- [Mai/Yahya] Homepage Bottom Grid (Category - First 4 Categories or not!)
- [Mai/Yahya] Steps for Category/Sub-Category (StockType/Fabric...)





## JZL/iThoob (Done)
- Homepage Categories Grid text (ال 4 صور اللى تحت)
- Homepage 2 Banner Sections text (اللى ليهم خلفية وعليهم كلام وزرار)
- Footer Text (جمب اللوجو)
- Footer Copyrights
- Product Details Policies (الضمان, التوصيل, إلغاء الطلبات)
- Customization Titles (القماشة -> القماش)
- Cancel Order Popup Policy (لما بتدوسى على إلغاء الطلب)
- Fix delivery date from-to range as 7-14 days in `Checkout`
- Update JZL WhatsApp Number:
    - iThoob: 966594704888
    - JZL: 966114703888

## Admin
- Increased `Banner Title` max characters to `35`

## JZL/iThoob (Notes)
- WHEN CANCEL AN ORDER, UNDER "الدفع والشحن" NOTES (مكتبتهمش) - It doesn't make sense!
- INCORRECT 4 Customizations Images: I need 4 thumbs (80x60), large images (1000x1200) and regular size (350x520)
- In `Checkout`, the `Delivery Date` has been changed from `فترة الاستلام المحدده في موعد الاستلام : 7-14يوم خارج الموسم` to the same current text but the date is calculated automatically, 7-14 days. Without adding the `خارج الموسم` - We don't think it's something to show to our customers!
- You can add banks from `Admin > Settings > Banks` dynamically
- Facebook link for JZL still missing:
    - Twitter: https://twitter.com/jzlstore
    - Instagram: https://www.instagram.com/jzlstore/
    - Facebook: 

Can I add a textarea for available sizes for "Shoes" for example?



## JZL/iThoob