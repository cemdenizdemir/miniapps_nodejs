const axios = require("axios");

const datasToReturn = (data) => {
  return {
    id: data.id,
    name: data.roman_name || data.name || data.title,
  };
};

const getSectionDatas = async (section) => {
  try {
    var data
    var response = await axios.get(`https://api.api-onepiece.com/v2/${section}/en`);
    data = response.data.map(data => {
      return datasToReturn(data)
    });

    return data
  } catch (error) {
    throw new Error("getSectionDatas error");
  }
};

module.exports = getSectionDatas;