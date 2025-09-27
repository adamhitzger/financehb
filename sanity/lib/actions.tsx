import { EnvelopeIcon } from "@sanity/icons";
import { DocumentActionProps } from "sanity";
import { useState } from "react";
import { handleSendMails } from "@/actions/users";


export default function sendMails({ draft, published, onComplete }: DocumentActionProps) {
    const [open, setOpen] = useState(false)
    const [sending, setSending] = useState(false)
    const [result, setResult] = useState<{ success?: boolean; count?: number }>({})
  
    const handleAction = async (formData: FormData) => {
      const documentData = draft || published
      if (!documentData) {
        alert("Žádná data nejsou k dispozici")
        onComplete()
        return
      }
  
      setSending(true)
  
      try {
        const response = await handleSendMails(formData, documentData)
        setResult({ success: true, count: response?.emails?.length || 0 })
      } catch (error) {
        console.error("Error v akci sendMails(): ", error)
        setResult({ success: false })
      } finally {
        setSending(false)
        setTimeout(() => {
          setOpen(false)
          onComplete()
        }, 2000)
      }
    }
  
    return {
      label: "Rozeslat newsletter",
      onHandle: () => {
        setOpen(true)
      },
      dialog: open && {
        type: "dialog",
        onClose: () => {
          setOpen(false)
          onComplete()
        },
        content: (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Rozeslat newsletter o novém článku</h2>
            {result.success === true ? (
              <div className="bg-green-100 p-3 rounded mb-4">
                Newsletter byl úspěšně odeslán {result.count} příjemcům.
              </div>
            ) : result.success === false ? (
              <div className="bg-red-100 p-3 rounded mb-4">Došlo k chybě při odesílání newsletteru.</div>
            ) : (
              <form className="flex flex-col space-y-4" action={handleAction}>
                <p className="text-sm text-gray-600 mb-2">
                  Vyberte skupiny příjemců, kterým chcete odeslat informaci o novém článku:
                </p>
  
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="tags" value="Stazeny eBook Financehb.cz" className="h-4 w-4" />
                    <span>Stažený eBook Financehb.cz</span>
                  </label>
  
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="tags" value="Mesicni akt z KPT" className="h-4 w-4" />
                    <span>Měsíční aktuality z KPT</span>
                  </label>
  
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="tags" value="Mesicni akt z KPT VZOR zdarma" className="h-4 w-4" />
                    <span>Měsíční aktuality z KPT VZOR zdarma</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="tags" value="Zkouska" className="h-4 w-4" />
                    <span>Zkouška</span>
                  </label>

                   <label className="flex items-center space-x-2">
                    <input type="checkbox" name="tags" value="Zkouska" className="h-4 w-4" />
                    <span>Zkouška</span>
                  </label>

                   <label className="flex items-center space-x-2">
                    <input type="checkbox" name="tags" value="Zkouska" className="h-4 w-4" />
                    <span>Zkouška</span>
                  </label>

                   <label className="flex items-center space-x-2">
                    <input type="checkbox" name="tags" value="Zkouska" className="h-4 w-4" />
                    <span>Zkouška</span>
                  </label>

                   <label className="flex items-center space-x-2">
                    <input type="checkbox" name="tags" value="Zkouska" className="h-4 w-4" />
                    <span>Zkouška</span>
                  </label>
                </div>
  
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      onComplete()
                    }}
                    className="px-4 py-2 border rounded"
                  >
                    Zrušit
                  </button>
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
                  >
                    {sending ? "Odesílání..." : "Odeslat"}
                  </button>
                </div>
              </form>
            )}
          </div>
        ),
      },
      icon: EnvelopeIcon,
    }
  }