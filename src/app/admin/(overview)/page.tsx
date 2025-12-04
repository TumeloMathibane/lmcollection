import Card from "@/components/ui/admin/card";
import Banner from "@/components/ui/admin/page-banner";
import Construction from "@/components/ui/under-construction";

export default async function Home() {
  return (
    <main className="relative p-6 space-y-4 flex flex-col h-screen">
      <Construction />
      <section>
        <Banner title="Admin" />
      </section>

      <section className="h-full">
        <div className="flex flex-col h-full gap-3">
          <div>
            {/* Page */}
            <div className="flex gap-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="border border-secondary p-3 flex-1 flex flex-col">
                  {index === 1 ?
                    <Card
                      cardTitle={`Card no. ${index + 1}`}
                      cardContent={`Card content for card #${index + 1}. And this is a little bit more content just to see if the sizing of this paragraph affects the size of other paragraph.`}
                      cardSmallText={`...small text for ${index + 1}`}
                    />
                  : <Card
                      cardTitle={`Card no. ${index + 1}`}
                      cardContent={`Card content for card #${index + 1}.`}
                      cardSmallText={`...small text for ${index + 1}`}
                    />
                  }
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col h-full gap-4">
            <div className="flex h-full gap-10">
              <div className="flex-1 border border-secondary">
                Content section 1
              </div>
              <div className="flex-1 border border-secondary">
                Content section 2
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
