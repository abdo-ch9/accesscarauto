import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mt-2">Answers to common questions.</p>

        <div className="card-automotive p-4 mt-6">
          <Accordion type="single" collapsible>
            <AccordionItem value="shipping">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>Standard shipping is 3–7 business days, express is 1–3.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>Returns accepted within 30 days in original packaging.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="fitment">
              <AccordionTrigger>How do I confirm fitment?</AccordionTrigger>
              <AccordionContent>Check the size guide and vehicle manual; contact support if unsure.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;


