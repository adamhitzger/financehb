"use client"

import { GoogleReCaptchaProvider } from  'react-google-recaptcha-v3';

export default function RecaptchaProvider({children}: {children: React.ReactNode}){
    return(
        <GoogleReCaptchaProvider 
        reCaptchaKey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY as string}
            scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
        >
            {children}
        </GoogleReCaptchaProvider>
    )
}