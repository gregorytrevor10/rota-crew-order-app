export enum MEMBER_TYPE {
  REGULAR = "Regular",
  NSF = "NSF",
  ORNS = "ORNS",
}

export enum SCDF_RANKS {
  RECRUIT = "scdf-recruit.png",
  PRIVATE = "scdf-private.png",
  LANCE_CORPORAL = "scdf-lance-corporal.png",
  CORPORAL = "scdf-corporal.png",
  // SPECIALIST_CADET_TRAINEE_JUNIOR_TERM = "scdf-specialist-cadet-trainee-junior-term.png",
  // SPECIALIST_CADET_TRAINEE_SENIOR_TERM = "scdf-specialist-cadet-trainee-senior-term.png",
  SERGEANT = "scdf-sergeant.png",
  WARRANT_OFFICER1 = "scdf-warrant-officer1.png",
  WARRANT_OFFICER2 = "scdf-warrant-officer2.png",
  // OFFICER_CADET = "scdf-officer-cadet.png",
  // OFFICER_CADET_SENIOR_TERM = "scdf-officer-cadet-senior-term.png",
  SECOND_LIEUTENANT = "scdf-2nd-lieutenant.png",
  LIEUTENANT = "scdf-lieutenant.png",
  // CAPTAIN = "scdf-captain.png",
  // MAJOR = "scdf-major.png",
  // LIEUTENANT_COLONEL = "scdf-lieutenant-colonel.png",
  // COLONEL = "scdf-colonel.png",
  // ASSISTANT_COMMISSIONER = "scdf-assistant-commissioner.png",
  // SENIOR_ASSISTANT_COMMISSIONER = "scdf-senior-assistant-commissioner.png",
  // DEPUTY_COMMISSIONER = "scdf-deputy-commissioner.png",
  // COMMISSIONER = "scdf-commissioner.png"
}

export enum MEAL_TIME {
  LUNCH = "Lunch",
  DINNER = "Dinner",
}

export function cleanUpRankString(rank: SCDF_RANKS) {
  return rank.replace(/-/g, " ").replace("scdf", "").replace(".png", "").replace("1", " I").replace("2", " II");
}

export const sexyTailwindButtonClassname = "border-transparent border-2 hover:border-blue-500 hover:shadow-xl hover:scale-105 transition-all";
