"use client"
import { SocialIcon } from "react-social-icons/component";
import "react-social-icons/whatsapp"
export default function WhatsAppButton(){

    return(
         <button id="whatsapp"
        className="fixed bottom-24 right-3 z-5000 rounded-full text-primary items-center justify-center flex flex-row shadow-lg"
      >
        <SocialIcon url={"https://whatsapp.com/channel/0029VbBc4534IBh6KVlWsf0f"} target='_blank' network={"whatsapp"} />
      </button>
    )
}