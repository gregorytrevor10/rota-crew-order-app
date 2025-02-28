import { toast } from "react-toastify";
import { MealRosterItemWithMember } from "../interface/MealRosterItem";
import { deleteMealTimeRosterItemsByMemberId, updateFoodOrderDetails } from "../services/mealTimeRoster";
import { cleanUpRankString, MEAL_TIME, sexyTailwindButtonClassname } from "../utils";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

interface FoodOrderCardProps {
  data: MealRosterItemWithMember;
  onDelete: (member_id: string) => void;
  refreshHandler: () => void;
}

const FoodOrderCard = ({ data, onDelete, refreshHandler }: FoodOrderCardProps) => {
  if (refreshHandler === undefined) {
    throw new Error("refreshHandler is required");
  }

  const [isShowingEditDialog, setIsShowingEditDialog] = useState<boolean>(false);
  const [food, setFood] = useState<string>(data.food);
  const [drink, setDrink] = useState<string>(data.drink);
  const [price, setPrice] = useState<number>(data.price);
  const [mealTime, setMealTime] = useState<MEAL_TIME>(data.meal_time);

  const handleDelete = async (member: MealRosterItemWithMember, onDelete: (member_id: string) => void) => {
    try {
      await deleteMealTimeRosterItemsByMemberId(member.member_id);
      toast.success("Member deleted successfully");
      onDelete(member.member_id);
    } catch (err) {
      toast.error("Error deleting member");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedItem = {
        ...data,
        food,
        drink,
        price,
        meal_time: mealTime,
      };
      await updateFoodOrderDetails(updatedItem);
      toast.success("Food order updated successfully");
      setIsShowingEditDialog(false);
      refreshHandler();
    } catch (error) {
      toast.error("Error updating food order");
    }
  };

  return (
    <div className={`p-4 my-4 rounded-md bg-slate-300 text-slate-900 capitalize ${sexyTailwindButtonClassname}`}>
      <img
        src={`https://www.cmpb.gov.sg/ResourcePackages/MINDEFPreEnlistment/assets/images/uploads/2015/12/${data.rota_members.rank}`}
        alt={`${data.rota_members.rank}`}
        className="w-[30px] inline-block mr-2 hover:scale-[3] transition-all"
      />
      <span className="font-semibold uppercase">
        {cleanUpRankString(data.rota_members.rank)} - {data.rota_members.first_name} {data.rota_members.last_name}
      </span>
      <p>Food: {data.food}</p>
      <p>Beverage: {data.drink}</p>
      <p>
        Price: <span className="font-mono font-bold">${data.price.toFixed(2)}</span>
      </p>{" "}
      <div className="flex justify-end gap-3">
        <button className="bg-yellow-500 text-white mt-2 px-2 py-1 rounded hover:bg-yellow-400 transition-colors" onClick={() => setIsShowingEditDialog(true)}>
          <i className="pi pi-pencil text" /> Edit
        </button>
        <button className="bg-indian_red text-white mt-2 px-2 py-1 rounded hover:bg-red-400 transition-colors" onClick={() => handleDelete(data, onDelete)}>
          <i className="pi pi-trash text" /> Delete
        </button>
      </div>
      <Dialog
        draggable={false}
        className="bg-slate-800 text-white rounded-md px-6 py-[2em] pb-[4em] max-w-[75vw]"
        header={
          <span>
            Edit Food Order for <span className="font-semibold text-blue-400 text-lg">{`${data.rota_members.first_name} ${data.rota_members.last_name}`}</span>
          </span>
        }
        modal
        visible={isShowingEditDialog}
        onHide={() => setIsShowingEditDialog(false)}
      >
        <hr className="my-[1em]" />
        <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4">
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
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(parseFloat(e.target.value).toFixed(2)))}
              className="w-full p-2 border rounded bg-white text-black"
              placeholder="Enter price"
              step="0.01"
              required
            />
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
            Update Food Order
          </button>
        </form>
      </Dialog>
    </div>
  );
};

export default FoodOrderCard;
