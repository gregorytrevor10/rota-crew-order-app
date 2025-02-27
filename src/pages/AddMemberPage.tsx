import { useState, useEffect } from "react";
import { MEMBER_TYPE, SCDF_RANKS } from "../utils";
import { readAllRotaMembers, deleteMemberById, addMember } from "../services/memberService";
import { Member } from "../interface/Member";
import LoadingSpinner from "../components/LoadingSpinner";

const AddMemberPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");
  const [rank, setRank] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoadingMemberList, setIsLoadingMemberList] = useState<boolean>(true);

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

  const handleDelete = async (member_id: string) => {
    try {
      await deleteMemberById(member_id);
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
      setFirstName("");
      setLastName("");
      setRank("");
      setType("");
      loadMembers();
    } catch (error) {
      alert(error);
      console.log(error);
      console.log(rank);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-oxford_blue text-light_cyan">
      <h1 className="text-2xl font-bold mb-4">Add Member</h1>
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
                {rank.replace(/-/g, " ").replace("scdf", "").replace(".png", "").replace("1", " I").replace("2", " II")}
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
        <button type="submit" className="bg-azure text-white px-4 py-2 rounded hover:bg-light_cyan transition-colors">
          Add Member
        </button>
      </form>
      <div>
        <div className="flex mt-8">
          <h1 className="text-2xl font-bold mt-4 flex-1">Existing Members</h1>
          <button className="bg-slate-700 float-end mt-4 rounded-md px-2" onClick={loadMembers}>
            🔁 Refresh
          </button>
        </div>

        {isLoadingMemberList ? (
          <LoadingSpinner />
        ) : (
          <ul>
            {members.map((member, index) => (
              <li className="bg-marian_blue px-4 py-2 mt-4 flex justify-between items-center rounded-md" key={index}>
                <span className="flex-1">
                  <img src={`https://www.cmpb.gov.sg/ResourcePackages/MINDEFPreEnlistment/assets/images/uploads/2015/12/${member.rank}`} className="w-[30px] inline-block mr-4 hover:scale-[3] transition-all" />
                  <span>
                    {`${member.first_name} ${member.last_name}`} - {member.type}
                  </span>
                </span>
                <button className="bg-indian_red text-white px-2 py-1 rounded hover:bg-red-700 transition-colors" onClick={() => handleDelete(member.member_id)}>
                  🗑️ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddMemberPage;
