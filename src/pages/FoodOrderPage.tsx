import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FoodOrderCard from "../components/FoodOrderCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { MealRosterItemWithMember } from "../interface/MealRosterItem";
import { readAllMealTimeRosterItemsWithMember, truncateMealTimeRoster } from "../services/mealTimeRoster";
import { MEAL_TIME, MEMBER_TYPE } from "../utils";
import { readRotaMembersByType } from "../services/memberService";
import { Member } from "../interface/Member";
import MemberFoodOrderForm from "../components/MemberFoodOrderForm";

const FoodOrderPage = () => {
  const [mealRosterItems, setMealRosterItems] = useState<MealRosterItemWithMember[]>([]);
  const [selectedMealTime, setSelectedMealTime] = useState<MEAL_TIME>(MEAL_TIME.LUNCH);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isOrderDialogueLoading, setIsOrderDialogueLoading] = useState<boolean>(false);
  const [isShowingOrderDialogue, setIsShowingOrderDialogue] = useState<boolean>(false);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedMemberType, setSelectedMemberType] = useState<MEMBER_TYPE | null>(null);

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

  const handleShowOrderDialogue = async (memberType: MEMBER_TYPE) => {
    setSelectedMemberType(memberType);
    setFilteredMembers([]);
    toast.info(memberType);
    setIsShowingOrderDialogue(true);
    setIsOrderDialogueLoading(true);
    try {
      const data = await readRotaMembersByType(memberType);
      setFilteredMembers(data);
      setIsOrderDialogueLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching members from the server");
    } finally {
      setIsOrderDialogueLoading(false);
    }
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
    setIsShowingOrderDialogue(false);
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
              <div className="flex">
                <h2 className="text-xl font-semibold text-light_cyan uppercase flex-1">{memberType}</h2>
                <button className="bg-green-600 py-1 px-2" onClick={() => handleShowOrderDialogue(memberType)}>
                  <i className="pi pi-plus mt-2" /> New {memberType} Order
                </button>
              </div>
              {mealRosterItems.map((item) => {
                return item.meal_time === selectedMealTime && item.rota_members.type === memberType ? <FoodOrderCard refreshHandler={loadRosterData} key={item.member_id} data={item} onDelete={handleDelete} /> : null;
              })}
            </div>
          ))}
        </div>
      )}
      <Dialog
        draggable={false}
        className="bg-slate-800 text-white rounded-md px-6 py-[2em] pb-[4em] max-w-[75vw] min-w-[150px]"
        header={
          <div>
            {isOrderDialogueLoading ? (
              <div className="scale-60 mt-10">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="mt-8 mb-4">
                <span>Please select a member from `{selectedMemberType}` to create an order for: </span>
                <select
                  className="mx-2 bg-slate-800 border-white border text-white rounded-md p-2"
                  name="member"
                  id="member"
                  onChange={(e) => {
                    const memberId = e.target.value;
                    const member = filteredMembers.find((m) => m.member_id === memberId) || null;
                    setSelectedMember(member);
                  }}
                >
                  <option value="">Select Member</option>
                  {filteredMembers.map((member) => (
                    <option key={member.member_id} value={member.member_id}>
                      {member.first_name} {member.last_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        }
        modal
        visible={isShowingOrderDialogue}
        onHide={() => {
          if (!isShowingOrderDialogue) return;
          setIsShowingOrderDialogue(false);
        }}
      >
        {selectedMember && !isOrderDialogueLoading && (
          <MemberFoodOrderForm
            selectedMember={selectedMember}
            onClose={() => {
              setIsShowingOrderDialogue(false);
              loadRosterData();
            }}
          />
        )}
      </Dialog>
    </div>
  );
};

export default FoodOrderPage;
