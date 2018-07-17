const utils = require('./utilities.service')

/**
 * Service for creating semi-anonymous participant usernames for users
 * List of names credit goes to: http://stackoverflow.com/q/16826200/1449799
 *
 * Username Conflict Analysis:
 * --------------------------
 * lastName has 61! / (61 - 2)! permutations (3660)
 * firstName + lastName has (3660 + 30)! / (3660 + 30) - 2)! permutations (13,612,410)
 *
 * Probability of name collision is approximated by the hash colision
 * probability formula: 1 - e^( -k * (k - 1) / 2 * N ) where k = the number of
 * theoretical users and N = the previously calculated number of permutations
 * k = 100, N = 13,612,410: Probability = 3.6 * 10^-4
 * k = 10,000, N = 13,612,410: Probability = 0.97
 *
 * Take the above as proof this isn't a very good 'hashing algorithm', even if
 * it does work for our purposes, so collisions will have to be mitigated.
 */

// prettier-ignore
const firstNames = [
  'Almond', 'Orange', 'Apricot', 'Aquamarine', 'Asparagus', 'Bittersweet',
  'Black', 'Blue', 'BlueBell', 'Melon', 'Magenta', 'Tan', 'Blush', 'BrickRed',
  'Lavender', 'Brown', 'Scarlet', 'Pink', 'Peach', 'Shadow', 'Canary', 'Denim',
  'Carmine', 'White', 'Sunglow', 'Cerise', 'Cerulean', 'Sepia', 'Gold', 'Ruby',
  'Beaver', 'Yellow', 'Copper', 'Maize', 'Red', 'Cranberry', 'Dandelion', 'Tie',
  'Violet', 'Silver', 'Eggplant', 'Fern', 'Orchid', 'Fuchsia', 'FuzzyWuzzy',
  'Geranium', 'Indigo', 'Mauve', 'Goldenrod', 'Shamrock', 'Gray', 'Green',
  'Plum', 'Pearl', 'Emerald', 'Diamond', 'Garnet', 'Opal', 'Topaz', 'Ruby'
]

// prettier-ignore
const lastNameRoots = [
  'Sepia', 'Inchworm', 'Indigo', 'Cranberry', 'Dandelion', 'Lavender', 'Pepper',
  'Apricot', 'LightBlue', 'Asparagus', 'Madder', 'Magenta', 'Mahogany', 'Maize',
  'Manatee', 'Gold', 'Mauve', 'Silver', 'Salmon', 'Shadow', 'Sunglow', 'White',
  'Yellow', 'Eggplant', 'Beaver', 'Violet', 'Fern', 'Scarlet', 'Monochrome'
]

// prettier-ignore
const lastNameSuffixes = [
  'Melon', 'Almond', 'Tan', 'Peach', 'Fuchsia', 'Green', 'Brown', 'Chestnut',
  'Thistle', 'Red', 'Blush', 'Denim', 'Mulberry', 'Cerise', 'Wisteria', 'Star',
  'Orange', 'Finger', 'Blue', 'Orchid', 'Carmine', 'Canary', 'Pink', 'Fish',
  'Periwinkle', 'Copper', 'Plum', 'Gray', 'Tie', 'Apple', 'Cherry', 'Shrimp'
]

module.exports = {
  generateSillyname: () => {
    const firstName = firstNames[utils.getRandomInt(0, firstNames.length)]

    const lastNameRoot =
      lastNameRoots[utils.getRandomInt(0, lastNameRoots.length)]

    const lastNameSuffix =
      lastNameSuffixes[utils.getRandomInt(0, lastNameSuffixes.length)]

    return `${firstName} ${lastNameRoot + lastNameSuffix}`
  }
}
