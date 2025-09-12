import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Calendar, CreditCard } from "lucide-react"
import Link from "next/link"

interface SubscriptionExpiryEmailProps {
  name: string
  surname: string
  expirationText: string
}

export function SubscriptionExpiryEmail({ name, surname, expirationText }: SubscriptionExpiryEmailProps) {
  return (
    <div className="max-w-2xl mx-auto text-white font-sans" style={{ backgroundColor: "#091A49" }}>
      {/* Email Header */}
      <div className="px-8 py-6" style={{ background: "linear-gradient(to right, #0A1B4A, #0C1F52)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#C2B067" }}>
            <CreditCard className="w-6 h-6" style={{ color: "#091A49" }} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Oznámení o předplatném</h1>
            <p className="text-sm opacity-80 text-white">Důležité informace o účtu</p>
          </div>
        </div>
      </div>

      {/* Email Body */}
      <div className="px-8 py-6">
        {/* Greeting */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">
            Vážený/á {name} {surname},
          </h2>
          <p className="leading-relaxed opacity-80 text-white">
            Doufáme, že jste spokojeni s našimi službami. Píšeme Vám ohledně důležité aktualizace týkající se Vašeho
            předplatného.
          </p>
        </div>

        {/* Alert Card */}
        <Card className="mb-6" style={{ borderColor: "#C2B067", backgroundColor: "rgba(194, 176, 103, 0.1)" }}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-6 h-6" style={{ color: "#C2B067" }} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-white">
                  <Calendar className="w-4 h-4" />
                  Oznámení o vypršení předplatného
                </h3>
                <p className="leading-relaxed opacity-90 text-white">{`Vaše prémiové předplatné vyprší ${expirationText}. Abyste mohli bez přerušení pokračovat v užívání všech prémiových funkcí, obnovte prosím své předplatné před tímto datem.`}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Section */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-white">Co se bude dít dále?</h3>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: "#C2B067" }}
              ></span>
              <span className="opacity-80 text-white">
                Výhody Vašeho současného předplatného zůstanou aktivní až do data vypršení
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: "#C2B067" }}
              ></span>
              <span className="opacity-80 text-white">Po vypršení bude Váš účet převeden na náš bezplatný tarif</span>
            </li>
            <li className="flex items-start gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: "#C2B067" }}
              ></span>
              <span className="opacity-80 text-white">
                Předplatné můžete obnovit kdykoli a pokračovat v užívání prémiových funkcí
              </span>
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Link href={"https://www.financehb.cz/user"}>
            <Button
            variant={"default"}
                className="px-6 py-3 rounded-lg font-medium bg-transparent hover:opacity-80"
                style={{ borderColor: "#C2B067", color: "#C2B067" }}
            >
            Zobrazit detaily účtu
          </Button>
          </Link>
        </div>

        {/* Support Section */}
        <div
          className="rounded-lg p-4 mb-6"
          style={{ backgroundColor: "rgba(9, 26, 73, 0.3)", border: "1px solid rgba(194, 176, 103, 0.3)" }}
        >
          <h4 className="font-medium mb-2 text-white">Potřebujete pomoc?</h4>
          <p className="text-sm mb-3 text-white opacity-90">
            Pokud máte jakékoli otázky ohledně Vašeho předplatného nebo potřebujete pomoc, náš tým podpory je zde pro
            Vás.
          </p>
          <Button
            variant="link"
            className="p-0 h-auto font-medium text-sm hover:opacity-80"
            style={{ color: "#C2B067" }}
          >
            Kontaktovat podporu →
          </Button>
        </div>

        {/* Closing */}
        <div className="opacity-80 text-white">
          <p className="mb-2">Děkujeme, že jste součástí naší komunity.</p>
          <p className="font-medium">
            S pozdravem,
            <br />
            Tým podpory
          </p>
        </div>
      </div>

      {/* Email Footer */}
      <div
        className="px-8 py-6 border-t"
        style={{ backgroundColor: "rgba(9, 26, 73, 0.5)", borderColor: "rgba(194, 176, 103, 0.3)" }}
      >
        <div className="text-center">
          <p className="text-xs mb-2 text-white opacity-80">
            Tento e-mail byl odeslán na adresu {name.toLowerCase()}.{surname.toLowerCase()}@example.com
          </p>
          <p className="text-xs text-white opacity-80">© 2024 Název vaší společnosti. Všechna práva vyhrazena.</p>
          <div className="flex justify-center gap-4 mt-3">
            <Button variant="link" className="text-xs p-0 h-auto hover:opacity-80" style={{ color: "#C2B067" }}>
              Odhlásit odběr
            </Button>
            <Button variant="link" className="text-xs p-0 h-auto hover:opacity-80" style={{ color: "#C2B067" }}>
              Zásady ochrany osobních údajů
            </Button>
            <Button variant="link" className="text-xs p-0 h-auto hover:opacity-80" style={{ color: "#C2B067" }}>
              Podmínky služby
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
