import { useState, useEffect } from "react";
import { Member } from "../interface/Member";
import { readAllRotaMembers } from "../services/memberService";
import { MEMBER_TYPE } from "../utils";

const LunchPage = () => {
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

  useEffect(() => {
    loadMembers();
    console.log(members, membersSample, isLoadingMemberList);
  }, []);

  const membersSample = {
    [MEMBER_TYPE.REGULAR]: ["name1", "name2", "name3", "name4", "name5", "name6", "name7", "name8", "name9", "name10"],
    [MEMBER_TYPE.NSF]: ["name1", "name2", "name3"],
    [MEMBER_TYPE.ORNS]: ["name1", "name2", "name3", "name4"],
  };

  return (
    <div className="container mx-auto p-4 bg-oxford_blue text-light_cyan">
      <h1 className="text-2xl font-bold mb-4 text-light_cyan">Lunch Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(MEMBER_TYPE).map((memberType) => (
          <div className="border p-4 rounded shadow h-fit bg-marian_blue" key={memberType}>
            <h2 className="text-xl font-semibold text-light_cyan">{memberType}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LunchPage;
