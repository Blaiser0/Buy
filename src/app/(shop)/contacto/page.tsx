export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14 md:px-6 md:py-16">
      <h1 className="mb-4 text-2xl font-semibold text-[#2C2C2C] sm:text-3xl">
        Contacto
      </h1>
      <div className="space-y-3 rounded-xl bg-[#F8F6F0] p-5 text-sm text-[#2C2C2C]/80 sm:p-8 sm:text-base">
        <p>¿Tienes dudas sobre tu rutina o un pedido?</p>
        <p>
          Escríbenos a{" "}
          <a
            href="mailto:hola@buyu.store"
            className="font-medium text-[#E50914] hover:underline"
          >
            hola@buyu.store
          </a>
        </p>
      </div>
    </section>
  );
}
