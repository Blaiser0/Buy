export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <h1 className="mb-4 text-3xl font-semibold text-[#2C2C2C]">Contacto</h1>
      <div className="space-y-3 rounded-xl bg-[#F8F6F0] p-8 text-[#2C2C2C]/80">
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
