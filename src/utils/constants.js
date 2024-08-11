export const weatherCondition = [
    // DAYTIME WEATHER CARDS //
    {
        day: true,
        condition: "clear",
        image: new URL('../assets/day/sunny.svg', import.meta.url).href,
    },
    {
        day: true,
        condition: "clouds",
        image: new URL('../assets/day/cloudy.svg', import.meta.url).href,
    },
    {
        day: true,
        condition: "rain",
        image: new URL('../assets/day/rain.svg', import.meta.url).href,
    },
    {
        day: true,
        condition: "thunderstorm",
        image: new URL('../assets/day/storm.svg', import.meta.url).href,
    },
    {
        day: true,
        condition: "snow",
        image: new URL('../assets/day/snow.svg', import.meta.url).href,
    },
    {
        day: true,
        condition: "fog",
        image: new URL('../assets/day/fog.svg', import.meta.url).href,
    },
    // NIGHTTIME WEATHER CARDS //
    {
        day: false,
        condition: "clear",
        image: new URL('../assets/night/sunny-night.svg', import.meta.url).href,
    },
    {
        day: false,
        condition: "clouds",
        image: new URL('../assets/night/cloudy-night.svg', import.meta.url).href,
    },
    {
        day: false,
        condition: "rain",
        image: new URL('../assets/night/rain-night.svg', import.meta.url).href,
    },
    {
        day: false,
        condition: "thunderstorm",
        image: new URL('../assets/night/storm-night.svg', import.meta.url).href,
    },
    {
        day: false,
        condition: "snow",
        image: new URL('../assets/night/snow-night.svg', import.meta.url).href,
    },
    {
        day: false,
        condition: "fog",
        image: new URL('../assets/night/fog-night.svg', import.meta.url).href,
    },
]

export const defaultCondition = {
    day: {
        image: new URL('../assets/day/default-day.svg', import.meta.url).href,
    },
    night: {
        image: new URL('../assets/night/default-night.svg', import.meta.url).href,
    }
}

// export const defaultClothingItems = [
//     {
//       _id: 0,
//       name: "Cap",
//       weather: "hot",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
//     },
//     {
//       _id: 1,
//       name: "Hoodie",
//       weather: "warm",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
//     },
//     {
//       _id: 2,
//       name: "Jacket",
//       weather: "cold",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
//     },
//     {
//       _id: 3,
//       name: "Sneakers",
//       weather: "cold",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
//     },
//     {
//       _id: 4,
//       name: "T-Shirt",
//       weather: "hot",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
//     },
//     {
//       _id: 5,
//       name: "Coat",
//       weather: "cold",
//       link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
//     }
//   ]

export const coordinates = {
    latitude: 39.961178,
    longitude: -82.998795,
}

export const APIkey = 'a98ca634fba75265fa51bba13409546d'

// json-server --watch db.json --id _id --port 3001
