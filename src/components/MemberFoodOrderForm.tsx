import React, { useState } from "react";
import { toast } from "react-toastify";
import { MealRosterItemWithMember } from "../interface/MealRosterItem";
import { Member } from "../interface/Member";
import { addMealTimeRosterItem } from "../services/mealTimeRoster";
import { MEAL_TIME } from "../utils";

interface MemberFoodOrderFormProps {
  selectedMember: Member | null;
  onClose: () => void;
}

const MemberFoodOrderForm: React.FC<MemberFoodOrderFormProps> = ({ selectedMember, onClose }) => {
  const [food, setFood] = useState<string>("");
  const [drink, setDrink] = useState<string>("");
  const [price, setPrice] = useState<number>(0.0);
  const [mealTime, setMealTime] = useState<MEAL_TIME>(MEAL_TIME.LUNCH);

  const handleFoodOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    try {
      const mealRosterItem: Omit<MealRosterItemWithMember, "rota_members"> = {
        member_id: selectedMember.member_id,
        created_at: new Date().toISOString(),
        food,
        drink,
        price: price,
        meal_time: mealTime,
      };

      await addMealTimeRosterItem(mealRosterItem);
      toast(`Successfully added food order for ${selectedMember.first_name} ${selectedMember.last_name} ✅`, { position: "top-center" });
      onClose();
      setFood("");
      setDrink("");
      setPrice(0.0);
      setMealTime(MEAL_TIME.LUNCH);
    } catch (error) {
      toast(`Failed to add food order. 😢😢😢 ➡️ ${(error as Error).message}`, { position: "top-center" });
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleFoodOrderSubmit} className="grid grid-cols-1 gap-4 w-[500px]">
      <div className="flex items-center">
        <label className="block mr-4" htmlFor="food">
          Food
        </label>
        <input type="text" id="food" value={food} onChange={(e) => setFood(e.target.value)} className="w-full p-2 border rounded bg-white text-black" placeholder="Enter food" required />
      </div>
      <div className="flex items-center">
        <label className="block mr-4" htmlFor="drink">
          Drink
        </label>
        <input type="text" id="drink" value={drink} onChange={(e) => setDrink(e.target.value)} className="w-full p-2 border rounded bg-white text-black" placeholder="Enter drink" required />
      </div>
      <div className="flex items-center">
        <label className="block mr-4 font-bold text-lg" htmlFor="price">
          $
        </label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(parseFloat(parseFloat(e.target.value).toFixed(2)))} className="w-full p-2 border rounded bg-white text-black" placeholder="Enter price" step="0.01" required />
      </div>
      <div>
        <label className="block mb-2" htmlFor="mealTime">
          Meal Time
        </label>
        <select id="mealTime" value={mealTime} onChange={(e) => setMealTime(e.target.value as MEAL_TIME)} className="w-full p-2 border rounded bg-white text-black" required>
          {Object.values(MEAL_TIME).map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-lime-500 transition-colors">
        Add Food Order
      </button>
    </form>
  );
};

export default MemberFoodOrderForm;
