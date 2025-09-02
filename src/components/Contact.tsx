'use client';

import { useState } from "react";
// import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "next/navigation";

export default function Contact() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const payload = {
      conversion_identifier: "Site Maximo - Ribeira",
      name: formData.get("name"),
      email: formData.get("email"),
      mobile_phone: formData.get("phone"),
    };

    try {
      const responseRD = await fetch("https://api.rd.services/platform/conversions?api_key=e1b39558ec3f5391366b8b0e70800e62", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          event_type: 'CONVERSION',
          event_family: 'CDP',
          payload: payload
        })
      });

      formData.append("access_key", "53b390a1-a9f7-4eb0-b126-3dd5ee716720");

      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const responseEmail = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const resultEmail = await responseEmail.json();

      if (responseRD.ok && resultEmail.success) {
        setLoading(false);
        // setSuccess(true);
        console.log(resultEmail);
        router.push("/obrigado");
      } else {
        setLoading(false);
        console.log(resultEmail);
        setError(true);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error("RD Station integration error:", err);
    }
  }
  
    // const onHCaptchaChange = (token: string) => {
    //   setCaptchaToken(token);
    // };
  
  return (
    <section className="" id="contato">
      <div className="relative flex justify-center items-center">
        {error && <p className="text-center px-12 text-primary text-lg 2xl:text-2xl">Ocorreu um erro ao enviar sua mensagem. <br /> Por favor, tente novamente mais tarde.</p>}
        {/* {success && <p className="text-center px-12 text-primary text-lg 2xl:text-2xl">Obrigado! <br /> Seus dados foram enviados com sucesso, em breve entraremos em contato.</p>} */}
        {!error && !success && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 min-w-[300px] lg:min-w-[400px] 2xl:min-w-[450px] m-auto font-normal text-lg">
            <input type="hidden" name="subject" value="Novo lead recebido" />
            <input type="hidden" name="from_name" value="maximobrazcubas.com.br" />
            <input required type="text" name="name" placeholder="Nome" className="bg-white rounded-full px-6 py-2 outline-primary border-primary border placeholder:text-primary" minLength={2} maxLength={50} />
            <input required type="tel" name="phone" placeholder="Telefone" className="bg-white rounded-full px-6 py-2 outline-primary border-primary border placeholder:text-primary" minLength={8} maxLength={20} />
            <input required type="email" name="email" placeholder="E-mail" className="bg-white rounded-full px-6 py-2 outline-primary border-primary border placeholder:text-primary" maxLength={50} />
            {/* <textarea required name="mensagem" placeholder="Mensagem" rows={4} className="bg-white rounded-2xl px-5 py-2 resize-none outline-green" maxLength={1000} /> */}
            <button 
              disabled={loading} 
              type="submit" 
              className="bg-white border border-primary rounded-xl px-8 py-2 self-end cursor-pointer text-primary hover:bg-primary hover:text-white transition-all duration-300 outline-primary disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none"
            >
             {loading ? 'Enviando...' : 'Enviar'}
            </button>
            {/* <div className="flex justify-end w-full">
              <HCaptcha 
                sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                reCaptchaCompat={false}
                onVerify={onHCaptchaChange}
                loadAsync={true}
              />
            </div> */}
            <input type="checkbox" name="botcheck" className="hidden" style={{display: "none"}} />
          </form>
          )}
      </div>
    </section>
  );
}