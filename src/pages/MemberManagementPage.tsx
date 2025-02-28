import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { MealRosterItemWithMember } from "../interface/MealRosterItem";
import { Member } from "../interface/Member";
import { addMealTimeRosterItem } from "../services/mealTimeRoster";
import { addMember, deleteMemberById, readAllRotaMembers } from "../services/memberService";
import { cleanUpRankString, MEAL_TIME, MEMBER_TYPE, SCDF_RANKS, sexyTailwindButtonClassname } from "../utils";

const MemberManagementPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");
  const [rank, setRank] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingMemberList, setIsLoadingMemberList] = useState<boolean>(true);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isShowingOrderDialogue, setIsShowingOrderDialogue] = useState<boolean>(false);
  const [food, setFood] = useState<string>("");
  const [drink, setDrink] = useState<string>("");
  const [price, setPrice] = useState<number>(0.0);
  const [mealTime, setMealTime] = useState<MEAL_TIME>(MEAL_TIME.LUNCH);

  const loadMembers = async () => {
    setIsLoadingMemberList(true);
    try {
      const rota_members = await readAllRotaMembers();
      setMembers(rota_members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
    setIsLoadingMemberList(false);
  };

  const handleRefreshMembers = () => {
    loadMembers();
  };

  const handleDelete = async (member: Member) => {
    try {
      await deleteMemberById(member.member_id);
      toast(`successfully deleted ${member.rank} ${member.first_name} ${member.last_name} ✅`, { position: "top-center" });

      loadMembers(); // Refresh the members list after deletion
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const validRanks = Object.values(SCDF_RANKS);
      if (!validRanks.includes(rank as SCDF_RANKS)) {
        throw new Error("Invalid rank");
      }
      if (firstName.length < 3 || lastName.length < 3) {
        throw new Error("Name should be at least 3 characters long");
      }
      await addMember({ first_name: firstName, last_name: lastName, type: type, rank } as Member);
      toast(`successfully added ${firstName} ${lastName} as ${type} ✅`, { position: "top-center" });
      setFirstName("");
      setLastName("");
      setRank("");
      setType("");
      loadMembers();
    } catch (error) {
      toast(`failed to create a new member, hit and error. 😢😢😢 ➡️ ${(error as Error).message}`, { position: "top-center" });
      console.log(error);
      console.log(rank);
    }
  };

  const handleFoodOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    try {
      const mealRosterItem: Omit<MealRosterItemWithMember, "rota_members"> = {
        member_id: selectedMember.member_id,
        created_at: new Date().toISOString(),
        food,
        drink,
        price: price, // Convert the price to a number
        meal_time: mealTime,
      };

      await addMealTimeRosterItem(mealRosterItem);
      toast(`Successfully added food order for ${selectedMember.first_name} ${selectedMember.last_name} ✅`, { position: "top-center" });
      setIsShowingOrderDialogue(false);
      setSelectedMember(null);
      setFood("");
      setDrink("");
      setPrice(0.0);
      setMealTime(MEAL_TIME.LUNCH);
    } catch (error) {
      toast(`Failed to add food order. 😢😢😢 ➡️ ${(error as Error).message}`, { position: "top-center" });
      console.error(error);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-oxford_blue text-light_cyan">
      <h1 className="text-2xl font-bold mb-4">Member Management</h1>
      <form onSubmit={handleSubmit} className="bg-marian_blue p-4 rounded shadow">
        <div className="mb-4">
          <label className="block text-light_cyan mb-2" htmlFor="rank">
            Rank
          </label>
          <select id="rank" value={rank} onChange={(e) => setRank(e.target.value)} className="w-full p-2 border rounded bg-white text-oxford_blue capitalize" required>
            <option value="" disabled>
              Select rank
            </option>
            {Object.values(SCDF_RANKS).map((rank) => (
              <option key={rank} value={rank}>
                {cleanUpRankString(rank)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-light_cyan mb-2" htmlFor="firstName">
            First Name
          </label>
          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2 border rounded bg-white text-oxford_blue" placeholder="Enter first name" required />
        </div>
        <div className="mb-4">
          <label className="block text-light_cyan mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2 border rounded bg-white text-oxford_blue" placeholder="Enter last name" required />
        </div>
        <div className="mb-4">
          <label className="block text-light_cyan mb-2" htmlFor="type">
            Type
          </label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded bg-white text-oxford_blue" required>
            <option value="" disabled>
              Select member type
            </option>
            {Object.values(MEMBER_TYPE).map((memberType) => (
              <option key={memberType} value={memberType}>
                {memberType}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-500 transition-colors">
          Create New Member
        </button>
      </form>
      <div>
        <div className="flex mt-8">
          <h1 className="text-2xl font-bold mt-4 flex-1">Existing Members</h1>
          <button className="bg-slate-700 float-end mt-4 rounded-md px-2" onClick={handleRefreshMembers}>
            🔁 Refresh
          </button>
        </div>

        {isLoadingMemberList ? (
          <LoadingSpinner />
        ) : (
          <ul>
            {members.map((member, index) => (
              <li
                className={`
                  bg-marian_blue px-4 py-2 mt-4 flex gap-2 justify-between items-center rounded-md ${sexyTailwindButtonClassname}
                  `}
                key={index}
              >
                <span className="flex-1">
                  <img src={`https://www.cmpb.gov.sg/ResourcePackages/MINDEFPreEnlistment/assets/images/uploads/2015/12/${member.rank}`} alt={`${member.rank}`} className="w-[30px] inline-block mr-4 hover:scale-[3] transition-all" />
                  <span className="capitalize">{`${cleanUpRankString(member.rank)} ${member.first_name} - ${member.type}`}</span>
                </span>
                <button
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
                  onClick={() => {
                    setSelectedMember(member);
                    setIsShowingOrderDialogue(true);
                  }}
                >
                  ➕ Add Food Order
                </button>
                <button className="bg-indian_red text-white px-2 py-1 rounded hover:bg-red-700 transition-colors" onClick={() => handleDelete(member)}>
                  🗑️ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Dialog
        draggable={false}
        className="bg-slate-800 text-white rounded-md px-6 py-[2em] pb-[4em] max-w-[75vw]"
        header={
          <span>
            Add Food Order for <span className="font-semibold text-blue-400 text-lg">{`${selectedMember?.first_name} ${selectedMember?.last_name}`}</span>
          </span>
        }
        modal
        visible={isShowingOrderDialogue}
        onHide={() => {
          if (!isShowingOrderDialogue) return;
          setIsShowingOrderDialogue(false);
          setSelectedMember(null);
        }}
      >
        <hr className="my-[1em]" />
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
            Add Food Order
          </button>
        </form>
      </Dialog>
    </div>
  );
};

export default MemberManagementPage;
