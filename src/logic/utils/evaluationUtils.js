export function processResponseData(data) {
  const convertedJson = [];

  for (const item of data) {
    const temp = {
      "id": item.userId,
      "firstName": item.firstName,
      "lastName": item.lastName,
      "rollNumber": item.rollNumber
    }
    for (const criterion of item.criterias) {
      const label = `${criterion.id}`
      // temp[label] = criterion.point === null ? 0 : criterion.point;
      temp[label] = criterion.point;
    }
    convertedJson.push(temp);
  }
  return convertedJson;
}

export function processRequestData(data) {
  const convertedJson = [];
  for (const item of data) {
    const criteria = [];
    for (const key in item) {
      if (key !== "lastName" && key !== "firstName" && key !== "rollNumber" && key !== "id") {
        criteria.push({ templateHeaderId: + key, point: item[key] });
      }
    }

    convertedJson.push({
      userId: item.id,
      userCriterias: criteria
    });
  }
  return convertedJson;
}