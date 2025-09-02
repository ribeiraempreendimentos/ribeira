import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <section className="bg-[#efeeea] flex flex-col lg:flex-row items-center justify-center min-h-screen font-[family-name:var(--font-montserrat)]">
      <div className="relative lg:w-[55%] h-[100svh] flex items-center">
        <div className="block lg:hidden absolute inset-0 h-1/2 bg-gradient-to-b from-[#efeeea] via-[#efeeea]/85 to-transparent z-10"></div>
        <h2 className="text-primary uppercase text-center text-2xl font-medium absolute z-30 w-full top-32 left-1/2 -translate-x-1/2 block lg:hidden">
          Vem aí o lançamento <br /> mais aguardado de <br className="block md:hidden" /> <span className="text-secondary font-semibold">Braz Cubas</span>
        </h2>
        <Image
          src="/maximo.jpeg"
          alt="Máximo - Ribeira"
          width={2000}
          height={2000}
          quality={100}
          className="lg:max-w-[95%] h-full object-cover object-center lg:object-right z-0"
          priority
        />
        <h1 className="sr-only">Máximo Braz Cubas - Ribeira</h1>
        <Link href="#contact" title="Ir para contato" className="absolute mx-auto left-0 right-0 text-center text-white text-4xl bottom-3 animate-bounce z-40 lg:hidden">
          <h3>
            ↓
          </h3>
        </Link>
      </div>
      <div className="lg:w-[45%] lg:h-[100svh] h-[70svh] md:h-[60svh] flex items-center" id="contact">
        <div className="flex w-full h-full lg:h-4/5 flex-col items-center justify-evenly gap-5">
          <h2 className="text-primary uppercase text-center text-2xl font-medium hidden lg:block">
            Vem aí o lançamento <br /> mais aguardado de <br className="block md:hidden" /> <span className="text-secondary font-semibold">Braz Cubas</span>
          </h2>

          <Contact />

          <div className="flex flex-col items-center uppercase text-primary">
            <div className="flex items-end text-2xl gap-3">
              <p><span className="text-secondary text-4xl">1</span> suíte</p>
              <div className="bg-primary w-px h-[90%]" />
              <p><span className="text-secondary text-4xl">2</span> suítes</p>
            </div>
            <div className="bg-primary w-full h-px my-2" />
            <div className="flex text-sm gap-1">
              <p>com varanda</p>
              |
              <p>condomínio clube completo</p>
            </div>
          </div>

          <div className="flex items-center jutify center">
            <Image src="/logo-ribeira-novo.png" alt="Ribeira" width={250} height={46} />
          </div>
        </div>
      </div>
    </section>
  );
}
