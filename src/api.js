//Base URL
const base_url = "https://api.rawg.io/api";

const getCurrentMonth = () => {
    const month = new Date().getMonth() + 1;
    if (month < 10) {
        return `0${month}`;
    } else {
        return month;
    }
};

const getCurrentDay = () => {
    const day = new Date().getDate();
    if (day < 10) {
        return `0${day}`;
    } else {
        return day;
    }
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

const popular_games = `/games?dates=${lastYear},${currentDate}&ordering=-rating`;
const upcoming_games = `/games?dates=${currentDate},${nextYear}&ordering=-added&page_size=10`;
const new_games = `/games?dates=${lastYear},${currentDate}&ordering=-released&page-size=10`;

export const popularGamesURL = () => `${base_url}${popular_games}`;

export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;

export const newGamesURL = () => `${base_url}${new_games}`;

export const gameDetailsURL = (game_id) => `${base_url}/games/${game_id}`;

export const gameScreenshotsURL = (game_id) =>
    `${base_url}/games/${game_id}/screenshots`;
