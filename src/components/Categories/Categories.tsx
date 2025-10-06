import {
  Apple,
  BusFront,
  CreditCard,
  Dog,
  Drama,
  Dumbbell,
  GraduationCap,
  HandCoins,
  Hospital,
  House,
  PiggyBank,
  Utensils,
  Zap,
} from "lucide-react";

const Categories = ({ category }: { category: string }) => {
  switch (category) {
    case "FOOD":
      return <Utensils size={20} />;
    case "TRANSPORTATION":
      return <BusFront size={20} />;
    case "UTILITIES":
      return <Zap size={20} />;
    case "ENTERTAINMENT":
      return <Drama size={20} />;
    case "HEALTHCARE":
      return <Hospital size={20} />;
    case "EDUCATION":
      return <GraduationCap size={20} />;
    case "PERSONAL_CARE":
      return <Dumbbell size={20} />;
    case "GROCERIES":
      return <Apple size={20} />;
    case "RENT":
      return <House size={20} />;
    case "SALARY":
      return <HandCoins size={20} />;
    case "INVESTMENTS":
      return <PiggyBank size={20} />;
    case "OTHER":
      return <CreditCard size={20} />;
    case "PETS":
      return <Dog size={20} />;
    default:
      break;
  }
};

export default Categories;
