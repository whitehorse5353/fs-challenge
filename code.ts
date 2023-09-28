/* ************************************************************************
 * In this exercise, you're given a few functions simulating API          *
 * endpoints. Your task is to use them to write a function that retrieves *
 * a list of investable properties. Any property belonging to an          *
 * investable region or belonging to an investable region's descendant in *
 * the tree of regions is considered investable. Please write the most    *
 * performant but readable code you can (assuming the code would be       *
 * deployed to production), without modifying any of the API functions or *
 * the signature of `getInvestableProperties`. (You are allowed to add    *
 * your own helper functions though.) You can use the                     *
 * displayResults(data) helper as a sample callback. Your code should run *
 * on Node v14.17.                                                        *
 * ************************************************************************ */

/* ************************************************************************
 * AVAILABLE API FUNCTIONS -- DO NOT MODIFY THIS SECTION                  *
 * ************************************************************************ */

function waitFor(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

/* ************************************************************************
 * Returns a promise that returns an array of region objects that contain *
 * a parent region ("" when at the top level), creating a hierarchical    *
 * tree of data. Responses can take anywhere up to 1.5s to return. This   *
 * example uses a tree 4 levels deep, but your result will be tested      *
 * against a datafile that contains an unknown number of layers.          *
 * ************************************************************************ */

async function getAllRegions() {
    const regions = {
        regions: [
            {name: 'blackrod', parent: 'bolton'},
            {name: 'bolton', parent: 'manchester'},
            {name: 'bury', parent: 'manchester'},
            {name: 'camden', parent: 'central london'},
            {name: 'camden town', parent: 'camden'},
            {name: 'central london', parent: 'london'},
            {name: 'covent garden', parent: 'westminster'},
            {name: 'croydon', parent: 'south-west london'},
            {name: 'east london', parent: 'london'},
            {name: 'farnworth', parent: 'bolton'},
            {name: 'hatton garden', parent: 'camden'},
            {name: 'heywood', parent: 'rochdale'},
            {name: 'holborn', parent: 'camden'},
            {name: 'kensington and chelsea', parent: 'london'},
            {name: 'kew', parent: 'richmond upon thames'},
            {name: 'kingston upon thames', parent: 'south-west london'},
            {name: 'london', parent: ''},
            {name: 'manchester', parent: ''},
            {name: 'middleton', parent: 'rochdale'},
            {name: 'north london', parent: 'london'},
            {name: 'oldham', parent: 'manchester'},
            {name: 'richmond upon thames', parent: 'south-west london'},
            {name: 'rochdale', parent: 'manchester'},
            {name: 'south london', parent: 'london'},
            {name: 'south-west london', parent: 'london'},
            {name: 'twickenham', parent: 'richmond upon thames'},
            {name: 'west london', parent: 'london'},
            {name: 'westminster', parent: 'central london'},
            {name: 'wimbledon', parent: 'south-west london'},
        ],
    };

    await waitFor(Math.random() * 1500);

    return regions;
}

/* ************************************************************************
 * Takes as input a comma separated list of permissible regions. Will     *
 * return a promise that returns all properties that match any of the     *
 * regions provided (but will not make any assumptions about sub-regions: *
 * e.g. "london" will not return a match for "twickenham" even though     *
 * Twickenham is within the London region. Timing varies with the number  *
 * of provided regions. Assume that there are some regions that cause     *
 * unexpected errors which have not yet been investigated, and in such a  *
 * case the returned promise will be rejected with an error object.       *
 * ************************************************************************ */
async function getPropertiesByRegion(regions) {
    const properties = {
        properties: [
            {address: 'Whitton Rd, Twickenham TW2 7BA', region: 'twickenham'},
            {address: 'Royal Botanic Gardens, Kew, Richmond, Surrey, TW9 3AE', region: 'kew'},
            {address: 'Plough Ln, London SW17 0BL', region: 'wimbledon'},
            {address: 'Stables Market, Chalk Farm Road, London NW1', region: 'camden town'},
            {address: 'Westminster, London SW1A 0AA', region: 'westminster'},
            {address: 'The Esplanade, Rochdale OL16 1AQ', region: 'rochdale'},
            {address: 'The Old Town Hall, Parliament Square, Greaves Street, Oldham, OL1 1QN', region: 'oldham'},
            {address: 'Castle House, Castle Rd, Bury BL9 8QT', region: 'bury'},
        ],
    };

    const properties_to_return = {
        properties: [],
    };

    const array_of_regions = regions.split(',');
    const number_of_regions_requested = (array_of_regions.length || 1);

    for (const desired_region of array_of_regions) {
        const matching_properties = properties.properties.filter(record => record.region === desired_region);
        properties_to_return.properties.push(...matching_properties);
    }

    await waitFor(Math.random() * 1000 * number_of_regions_requested);
    return properties_to_return;
}

/* ************************************************************************
 * Will return a promise that returns all subregions in which investable  *
 * properties are contained. You should not assume that these are all     *
 * leaf-elements within the hierarchy of the region tree.                 *
 * ************************************************************************ */
async function getInvestableRegions() {
    const investable_regions = {
        regions: ['camden', 'kew', 'rochdale'],
    };

    await waitFor(Math.random() * 3000);

    return investable_regions;
}

function displayResults(data) {
    console.log(data);
}

/* ************************************************************************
 * END OF API IMPLEMENTATION                                              *
 * ************************************************************************ */


/* ************************************************************************
 * PLEASE IMPLEMENT YOUR RESPONSE BELOW:                                  *
 * ************************************************************************ */

/* ************************************************************************
 * Please write the most performant but readable code you can (assuming   *
 * the code would be deployed to production), without modifying any of    *
 * the functions above and the signature of the following function, that  *
 * will return a promise that returns an object with the "properties" key *
 * whose value is an array of properties - { properties: [ {...}, ... ] } *
 * The properties should be contained in the specified region or any      *
 * sub-region (or sub-sub-region down to an unknown nth level) that is    *
 * within the "investable" regions (e.g. if "bury" is a descendant of     *
 * "manchester", calling your method with "manchester" should return      *
 * investable properties both in "bury" and in "manchester"). Your method *
 * should take as input a region (e.g. "london" or "wimbledon"). When     *
 * getPropertiesByRegion returns a promise to be rejected with an error,  *
 * log that error and continue the process. displayResults is a sample    *
 * callback to help with debugging. Your code should run on Node v14.17.  *
 * ************************************************************************ */

// const getRegionalTree = async (top_level_region, regions) => {
//     const filteredRegions = regions.filter(region => region.parent === top_level_region);
//     return filteredRegions.reduce(async (previousPromise, region) => {
//         const lastResolvedPromise = await previousPromise;
//         lastResolvedPromise[region.name] = await getRegionalTree(region.name, regions);
//         return lastResolvedPromise;
//     }, Promise.resolve({}));
// }
//
// let matchingRegions = {};
// const getMatchingInvestableRegions = async (investableRegions, regionalTree) => {
//     for (const [key, value] of Object.entries(regionalTree)) {
//         if (typeof value === 'object') {
//             if (investableRegions.includes(key)) {
//                 matchingRegions[key] = value;
//             }
//             await getMatchingInvestableRegions(investableRegions, value);
//         }
//     }
//     return matchingRegions;
// };
//
// let result = [];
// const getCommaSeparatedRegions = async (matchedRegions) => {
//     for (const [key, value] of Object.entries(matchedRegions)) {
//         result.push(key);
//         if (typeof value === 'object') {
//             await getCommaSeparatedRegions(value);
//         }
//     }
//     return result.join(',');
// }
//
// async function getInvestableProperties(top_level_region) {
//     try {
//         const {regions: allAvailableRegions} = await getAllRegions();
//         const regionalTree = await getRegionalTree(top_level_region, allAvailableRegions);
//
//         const {regions: investableRegions} = await getInvestableRegions();
//         const matchedRegions = await getMatchingInvestableRegions(investableRegions, regionalTree);
//
//         const commaSeparatedRegions = await getCommaSeparatedRegions(matchedRegions);
//         return await getPropertiesByRegion(commaSeparatedRegions)
//
//     } catch (error) {
//         console.error(error);
//     }
// }

/* helpers to get you started */
// getAllRegions().then(displayResults);
// getInvestableRegions().then(displayResults);
// getPropertiesByRegion('twickenham').then(displayResults);
// getInvestableProperties('london').then(displayResults);

async function getInvestableProperties(displayResults) {
    // Step 1: Get all the regions from the API
    const { regions } = await getAllRegions();

    // Step 2: Filter out the investable regions based on the hierarchy
    const investableRegions = new Set();
    function getInvestableRegions(region) {
        if (region.parent === 'london' ||
            region.parent === 'manchester' ||
            investableRegions.has(region.parent)) {
            investableRegions.add(region.name);
            regions.filter(r => r.parent === region.name).forEach(getInvestableRegions);
        }
    }
    regions.filter(r => r.parent === '').forEach(getInvestableRegions);

    // Step 3: Get the properties based on the investable regions
    const investableProperties = [];
    for (const { address, region } of (await getPropertiesByRegion([...investableRegions])).properties) {
        investableProperties.push({ address, region });
    }

    // Step 4: Return the investable properties
    displayResults(investableProperties);
}
getInvestableProperties(displayResults)