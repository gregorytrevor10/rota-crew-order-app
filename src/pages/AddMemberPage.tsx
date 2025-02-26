import { useState, useEffect } from "react";
import { MEMBER_TYPE } from "../utils";
import { readAllRotaMembers, deleteMemberById, addMember } from "../services/memberService";
import { Member } from "../interface/Member";

const AddMemberPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  const loadMembers = async () => {
    try {
      const rota_members = await readAllRotaMembers();
      setMembers(rota_members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
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
      const validMemberTypes = [MEMBER_TYPE.REGULAR, MEMBER_TYPE.NSF, MEMBER_TYPE.ORNS];
      if (!validMemberTypes.includes(type as MEMBER_TYPE)) {
        throw new Error("Invalid member type");
      }
      if (firstName.length < 3 || lastName.length < 3) {
        throw new Error("Name should be at least 3 characters long");
      }
      await addMember({ first_name: firstName, last_name: lastName, type });

      setFirstName("");
      setLastName("");
      setType("");
      loadMembers();
    } catch (error) {
      console.log(error);
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
        <div className="flex">
          <h2 className="text-xl font-bold mt-4 flex-1">Members</h2>
          <button className="bg-slate-700 float-end mt-4 rounded-md px-2" onClick={loadMembers}>
            🔁 Refresh
          </button>
        </div>

        <ul>
          {members.map((member, index) => (
            <li className="bg-marian_blue px-4 py-2 mt-4 flex justify-between items-center" key={index}>
              <span>
                {`${member.first_name} ${member.last_name}`} - {member.type}
              </span>
              <button className="bg-indian_red text-white px-2 py-1 rounded hover:bg-red-700 transition-colors" onClick={() => handleDelete(member.member_id)}>
                🗑️ Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddMemberPage;
