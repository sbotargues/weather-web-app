import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
import { WeatherBackgroundMap } from "../Types/Types";

const rainGif = "https://media.giphy.com/media/l0Iy5fjHyedk9aDGU/giphy.gif";
const cloudGif = "https://media.giphy.com/media/1uLQUtPLbJMQ0/giphy.gif";
const drizzleGif = "https://media.giphy.com/media/xT9GEOg09OuResnZ6g/giphy.gif";
const clearGif =
  "https://media.giphy.com/media/7NRoRUOwM22OBAQS7L/giphy-downsized-large.gif";
const snowGif = "https://media.giphy.com/media/OWxrxRHY6afRu/giphy.gif";

const WeatherBackgrounds: WeatherBackgroundMap = {
  "01": { icon: clear, background: clearGif },
  "02": { icon: cloud, background: cloudGif },
  "03": { icon: drizzle, background: drizzleGif },
  "04": { icon: drizzle, background: drizzleGif },
  "09": { icon: rain, background: rainGif },
  "10": { icon: rain, background: rainGif },
  "13": { icon: snow, background: snowGif },
};

export default WeatherBackgrounds;
