import { Html, Head, Body, Container, Section, Text, Img, Button, Hr } from "@react-email/components";
import type { SanityDocument } from "next-sanity";
import {toHTML} from "@portabletext/to-html"
import urlBuilder from "@sanity/image-url";
import { projectId, dataset } from "@/sanity/env";

interface EmailTemplateProps {
  documentData: SanityDocument;
  email: string;
}

export default function EmailTemplate({ documentData, email }: EmailTemplateProps) {
  const { name, emailText, slug, image } = documentData;
  const articleUrl = `https://financehb.cz/paywall/${slug?.current || ""}`;
  const imageUrl = image?.url || "";

  const formattedDate = new Date().toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const benefits = [
    "Exkluzivní přístup k prémiového obsahu",
    "Detailní analýzy kapitálových trhů",
    "Přednostní přístup k novým článkům",
    "Možnost stahování doplňkových materiálů",
    "Konzultace s našimi odborníky",
  ];
  const html = toHTML(emailText, {
    components: {
      block: {
        h1: ({ children }) =>
          `<h1 style="font-size:28px;font-weight:bold;margin:16px 0">${children}</h1>`,
        h2: ({ children }) =>
          `<h2 style="font-size:22px;font-weight:bold;margin:14px 0">${children}</h2>`,
        normal: ({ children }) =>
          `<p style="font-size:16px;line-height:1.6;margin:8px 0">${children}</p>`,
        blockquote: ({ children }) =>
          `<blockquote style="border-left:4px solid #9333ea;padding-left:12px;margin:12px 0">${children}</blockquote>`
      },

      list: {
        bullet: ({ children }) =>
          `<ul style="padding-left:20px;margin:10px 0;font-size:16px;">${children}</ul>`,
        number: ({ children }) =>
          `<ol style="padding-left:20px;margin:10px 0;font-size:16px;">${children}</ol>`
      },

      listItem: {
        bullet: ({ children }) =>
          `<li style="margin-bottom:6px">${children}</li>`
      },

      marks: {
        strong: ({ children }) => `<strong>${children}</strong>`,
        em: ({ children }) => `<em>${children}</em>`,
        strike: ({ children }) => `<s>${children}</s>`,

        link: ({ children, value }) => {
          const href = value?.href || "#"
          return `
            <a href="${href}" target="_blank"
              style="color:#2563eb;text-decoration:underline">
              ${children}
            </a>
          `
        }
      },

      types: {
        image: ({ value }) => {
          const src = urlBuilder(value)
          return `
            <img
              src="${src}"
              alt=""
              width="400"
              style="max-width:100%;border-radius:8px;margin:12px auto;display:block"
            />
          `
        },

        file: ({ value }) => {
          const ref = value.asset?._ref
          if (!ref) return ""

          const [, id, ext] = ref.split("-")
          const url = `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`

          return `
            <p>
              📎 <a href="${url}" target="_blank">${url}</a>
            </p>
          `
        }
      }
    }
  })
  return (
    <Html lang="cs">
      <Head>
        <title>Novinky ze světa kapitálových trhů</title>
      </Head>
      <Body style={{ backgroundColor: "#f9f9f9", fontFamily: "Arial, sans-serif", color: "#333", lineHeight: 1.6 }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: 20, backgroundColor: "#fff" }}>
          {/* Header */}
          <Section style={{ textAlign: "center", padding: "20px 0" }}>
            <Img src="https://financehb.cz/_next/image?url=%2Flogo.png&w=640&q=75" alt="Logo Financehb.cz" width={200} style={{ height: "auto" }} />
            <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>Novinky ze světa kapitálových trhů</Text>
          </Section>

          {/* Intro */}
          <Section style={{fontSize: 22}}>
            <Text>Vážený čtenáři,</Text>
            <Text>máme pro Vás nový článek z oblasti kapitálových trhů.</Text>
          </Section>

          {/* Article */}
          <Section>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1a365d", marginBottom: 10 }}>{name}</Text>
            <Text style={{ fontSize: 14, color: "#666", marginBottom: 20 }}>{formattedDate}</Text>
            {imageUrl && <Img src={imageUrl} alt={name} style={{ width: "100%", height: "auto", marginBottom: 20 }} />}

        <Section>
  <div
  dangerouslySetInnerHTML={{__html: html}}
  >

  </div>
</Section>


            <Section style={{ marginTop: 20 }}>
              <Button style={{padding:12, backgroundColor: "#1a365d", color: "#fff", textDecoration: "none", marginRight: 10 }} href={articleUrl}>
                Přečíst článek
              </Button>
              <Button style={{padding:12, backgroundColor: "#1a365d", color: "#fff", textDecoration: "none" }} href="https://financehb.cz/paywall">
                Aktivovat předplatné
              </Button>
            </Section>
          </Section>

          {/* Benefits */}
          <Section style={{ backgroundColor: "#f0f4f8", padding: 20, margin: "20px 0", borderRadius: 4 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Proč se stát naším předplatitelem?</Text>
            <ul style={{ paddingLeft: 20 }}>
              {benefits.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </Section>

          {/* Closing */}
          <Section>
            <Text>Děkujeme za Vaši podporu a přejeme příjemné čtení!</Text>
            <Text>S pozdravem,<br />Petr Krajcigr</Text>
         </Section>

          {/* Contact */}
          <Section style={{ padding: 15, backgroundColor: "#f5f5f5", borderRadius: 4, textAlign: "center" }}>
            <Text><strong>Kontaktní informace:</strong></Text>
            <Text>Tel: +420 222 161 188</Text>
            <Text>Email: <a href="mailto:info@financehb.cz">info@financehb.cz</a></Text>
            <Text>Email: <a href="mailto:petr@efekta-iz.cz">petr@efekta-iz.cz</a></Text>
            
          </Section>

          {/* Footer */}
          <Section style={{ borderTop: "1px solid #eee", paddingTop: 20, fontSize: 12, color: "#666" }}>
            <Text>© {new Date().getFullYear()} Financehb.cz s.r.o. Všechna práva vyhrazena.</Text>
            <Text>
              Pokud si nepřejete dostávat tyto e-maily, můžete se <a href={`https://financehb.cz/sign-out?mail=${email}`}>Odhlásit zde</a>.
            </Text>
          </Section>

          {/* Legal */}
          <Section style={{ fontSize: 11, color: "#999", marginTop: 20, paddingTop: 20, borderTop: "1px solid #eee" }}>
            <Text>Finanční služby propagované a nabízené na tomto webu poskytuje společnost Financehb.cz s.r.o a zde uvedení poradci jako fyzické osoby: Petr Krajcigr, kteří jsou v oblasti:</Text>
            <Hr style={{ border: "1px solid #eee", margin: "10px 0" }} />
            <ul>
              <li>pojištění registrovaní podle zákona č. 170/2018 Sb. jako vázaní zástupci samostatného zprostředkovatele pojištění,</li>
              <li>doplňkového penzijního spoření podle zákona č. 256/2004 Sb. jako vázaní zástupci investičního zprostředkovatele,</li>
              <li>spotřebitelských úvěrů podle zákona č. 257/2016 Sb. jako vázaní zástupci samostatného zprostředkovatele spotřebitelského úvěru, společnosti Chytrý Honza a.s. sídlem Radlická 365/154, Radlice, 158 00 Praha. Tuto skutečnost je možné ověřit v Seznamu regulovaných a registrovaných subjektů finančního trhu České národní banky na <a href="http://www.cnb.cz/cnb/jerrs">http://www.cnb.cz/cnb/jerrs</a>.</li>
            </ul>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
