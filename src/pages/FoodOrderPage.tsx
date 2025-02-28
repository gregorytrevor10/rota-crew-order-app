import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { MealRosterItemWithMember } from "../interface/MealRosterItem";
import { MEAL_TIME, MEMBER_TYPE } from "../utils";
import { readAllMealTimeRosterItemsWithMember, truncateMealTimeRoster } from "../services/mealTimeRoster";
import FoodOrderCard from "../components/FoodOrderCard";
import { toast } from "react-toastify";

const LunchPage = () => {
  const [mealRosterItems, setMealRosterItems] = useState<MealRosterItemWithMember[]>([]);
  const [selectedMealTime, setSelectedMealTime] = useState<MEAL_TIME>(MEAL_TIME.LUNCH);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setSelectedMealTimeHandler = (mealTime: MEAL_TIME) => {
    setSelectedMealTime(mealTime);
  };

  const loadRosterData = async () => {
    setIsLoading(true);
    try {
      const data = await readAllMealTimeRosterItemsWithMember();
      setMealRosterItems(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
    setIsLoading(false);
  };

  const handleDelete = (member_id: string) => {
    setMealRosterItems((prevItems) => prevItems.filter((item) => item.member_id !== member_id));
  };

  const clearMealTimeRoster = async () => {
    try {
      await truncateMealTimeRoster();
      toast.success("all orders cleared successfully");
      loadRosterData();
    } catch (err) {
      console.log(err);
      toast.error("Error deleting member");
    }
  };

  useEffect(() => {
    loadRosterData();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-oxford_blue text-light_cyan w-full">
      <h1 className="text-2xl font-bold mb-4 text-light_cyan">Mealtime Roster</h1>
      <div className="text-xl mb-4">
        <label>Select a meal time: </label>
        <div className="flex space-x-4 pt-2">
          {Object.values(MEAL_TIME).map((mealTime, index) => (
            <label key={index} className="flex items-center space-x-2 bg-slate-600 p-2 rounded-md">
              <input type="radio" name="mealTime" value={mealTime} checked={selectedMealTime === mealTime} onChange={() => setSelectedMealTimeHandler(mealTime)} className="text-black" />
              <span>{mealTime}</span>
            </label>
          ))}
          <button className="bg-indian_red text-white p-2 rounded-md hover:bg-red-400 transition-colors" onClick={clearMealTimeRoster}>
            <i className="pi pi-trash text" /> Clear All Order
          </button>
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-row gap-4 overflow-auto hide-scrollbar">
          {Object.values(MEMBER_TYPE).map((memberType) => (
            <div className="border-blue-500 border-2 p-4 rounded shadow h-fit bg-marian_blue min-w-[400px]" key={memberType}>
              <h2 className="text-xl font-semibold text-light_cyan uppercase">{memberType}</h2>
              {mealRosterItems.map((item) => {
                return item.meal_time === selectedMealTime && item.rota_members.type === memberType ? <FoodOrderCard refreshHandler={loadRosterData} key={item.member_id} data={item} onDelete={handleDelete} /> : null;
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LunchPage;
