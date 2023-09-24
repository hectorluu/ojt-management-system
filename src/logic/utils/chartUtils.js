export function processSkillChart(data) {
  let result = { label: [], init: [], current: [] };
  for (let i = 0; i < data.length; i++) {
    result["label"] = [...result["label"], data[i].skillName];
    result["init"] = [...result["init"], data[i].initSkill];
    result["current"] = [...result["current"], data[i].currentSkill];
  }
  return result;
};