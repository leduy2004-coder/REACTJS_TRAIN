import PromotionCard from "./PromotionCard";

type Promotion = { id: string; title: string; description: string };

const defaultPromotions: Promotion[] = [
  { id: "1", title: "Special Offer", description: "Up to 30% off selected items" },
  { id: "2", title: "Fresh Bakery Sale", description: "Buy 2 get 1 free on breads" },
  { id: "3", title: "Weekly Deals", description: "Save more on your favorites" },
];

const PromotionsGrid = ({ promotions = defaultPromotions }: { promotions?: Promotion[] }) => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {promotions.map((p) => (
            <PromotionCard
              key={p.id}
              title={p.title}
              description={p.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsGrid;


