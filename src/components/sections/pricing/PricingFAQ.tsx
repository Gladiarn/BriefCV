export function PricingFAQ() {
  const faqs = [
    { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time without hidden fees." },
    { q: "Is there a free trial?", a: "We offer a free Starter plan for students and individuals to get started." },
    { q: "Can I switch plans later?", a: "Absolutely, you can upgrade or downgrade your plan at any time." },
  ];

  return (
    <div className="mt-24 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-start">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {faqs.map((faq) => (
          <div key={faq.q} className="p-8 rounded-3xl bg-card border border-border flex flex-col items-center text-center">
            <h3 className="font-bold mb-4">{faq.q}</h3>
            <p className="text-sm text-muted-foreground">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
