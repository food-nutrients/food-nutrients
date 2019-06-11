import axios from 'axios';
import fs from 'fs-extra';

class USDA {
    async getFoodByID(foodId: string, access_token: string): Promise<any> {
        const url = `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${foodId}&type=f&format=json&api_key=${access_token}`
        return (await axios.get(url)).data.foods[0].food;
    }
    async cachedGetFoodById(foodId: string, access_token: string): Promise<any> {
        try {
            const food = JSON.parse(await fs.readFile(`foods/${foodId}.json`, 'utf-8'));
            return food;
        } catch (e) {
            const food = await this.getFoodByID(foodId, access_token);
            await fs.writeFile(`foods/${foodId}.json`, JSON.stringify(food, null, 4));
            return JSON.parse(await fs.readFile(`foods/${foodId}.json`, 'utf-8'));
        }
    }
    formatFood(food: any) {
        const get = (id: number): number => {
            if (id === null) return null;
            const nutrient = food.nutrients.find((nutrient: any) => nutrient.nutrient_id === id);
            if (!nutrient) return null;
            /* 
                We divide by 100 because of how we store the nutrients - we can easly multiply them by 100 grams (serving size). We store them as nutrient per 1 g.
            */
            if (nutrient.unit === 'µg') return nutrient.value / 100;
            if (nutrient.unit === 'mg') return nutrient.value * 1000 / 100;
            if (nutrient.unit === 'g') return nutrient.value * 1000 * 1000 / 100;
            if (nutrient.unit === 'kcal') return nutrient.value / 100;

            throw Error(`Unrecognized unit ${nutrient.unit}`);
        }
        return {
            name: food.desc.name,
            usda_id: food.desc.ndbno,
            calories: get(208),
            proteins: get(203),
            fat: get(204),
            carbohydrates: get(205),
            fibers: get(291),
            serving: 100,
            nutrients: {
                "Calcium": get(301),
                "Iron": get(303),
                "Potassium": get(306),
                "Magnesium": get(304),
                "Phosphorus": get(305),
                "Chromium": get(null),
                "Iodine": get(null),
                "Sodium": get(307),
                "Chloride": get(null),
                "Zinc": get(309),
                "Copper": get(312),
                "Molybdenum": get(null),
                "Manganese": get(315),
                "Selenium": get(317),
                "Vitamin C": get(401),
                "Vitamin B12": get(418),
                "Vitamin B1": get(404), // Thiamine or thiamin
                "Vitamin B2": get(405), // Riboflavin
                "Vitamin B3": get(406), // 3 forms (nicotinamide (niacinamide), niacin (nicotinic acid), and nicotinamide riboside)
                "Vitamin B5": get(410), //Pantothenic acid
                "Vitamin B6": get(415),
                "Vitamin B7": get(null), // Biotin, formerly known vit. H or coenzyme R
                "Vitamin B9": get(431), // Folic acid
                "Choline": get(421),
                "Vitamin A": get(320),
                "Vitamin E": get(323),
                "Vitamin K": get(430),
                "Linoleic acid": get(null),
                "α-Linolenic acid": get(null),
                "Tryptophan": get(501),
                "Threonine": get(502),
                "Isoleucine": get(503),
                "Leucine": get(504),
                "Lysine": get(505),
                "Methionine": get(506),
                "Phenylalanine": get(508),
                "Valine": get(510),
                "Histidine": get(512)
            }
        }
    }
}

(async function () {
    if (process.argv.length !== 3) {
        console.log('USDA Food Data Extractor');
        console.log('=======================');
        console.log('Usage: node dist/usda.js [usda_id]');
        console.log('You can find the usda id from: https://ndb.nal.usda.gov/ndb/search/list')
        console.log('Example Usage: node dist/usda.js 11564');
        process.exit()
    }
    const usda = new USDA();
    const access_token = 'NVedpClwdoyIIuXpeWNlkMnBeABnK922mcZwhqPv';
    const food = await usda.cachedGetFoodById(process.argv[2], access_token);
    const formattedFood = usda.formatFood(food);
    console.log(JSON.stringify(formattedFood, null, 4));
})()