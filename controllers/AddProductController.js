import dataOptions from "../dataOptions.js";

export const getAreas = async (req, res) => {
  try {
    const areas = [
      "15 м² - 20 м²",
      "25 м² - 30 м²",
      "30 м² - 40 м²",
      "40 м² - 50 м²",
      "60 м² - 70 м²",
      "70 м² - 80 м²",
      "100 м²",
    ];

    res.json(areas);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить список площадей помещений",
    });
  }
};

export const getBrands = async (req, res) => {
  try {
    const brands = [
      "Rovex",
      "JAX",
      "Ballu",
      "Electrolux",
      "Zanussi",
      "Toshiba",
      "Shuft",
      "Denko",
      "Centek",
      "Lessar",
    ];

    res.json(brands);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить список брендов",
    });
  }
};

export const getCountries = async (req, res) => {
  try {
    res.json(dataOptions.country);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить список стран",
    });
  }
};
