import { Member } from "../interface/Member";

interface LunchCardProps {
  member: Member;
}

const LunchCard = ({ member }: LunchCardProps) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h1>
        {member.first_name} {member.last_name}
      </h1>
      <p>{member.rank}</p>
    </div>
  );
};

export default LunchCard;
