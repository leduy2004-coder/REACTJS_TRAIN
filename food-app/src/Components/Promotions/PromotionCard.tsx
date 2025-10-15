type Props = {
  title: string;
  description: string;
  cta?: string;
  onClick?: () => void;
};

const PromotionCard = ({ title, description, cta = "Shop Deals", onClick }: Props) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-red-50 to-orange-50 p-6 shadow-sm">
      <h3 className="mb-2 text-lg font-bold text-gray-800">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      <button
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-red-700"
        onClick={onClick}
      >
        {cta}
      </button>
    </div>
  );
};

export default PromotionCard;


