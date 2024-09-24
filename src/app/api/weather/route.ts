import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
interface buildUserFetchUrl {
  city: string | null;
}
const buildUserFetchUrl = (params: buildUserFetchUrl) => {
  const query = new URLSearchParams();
  debugger;
  if (params.city) query.append('q', params.city.toString());

  const queryParameter = query.toString();
  if (queryParameter == '?') {
    return '';
  }

  return `?${queryParameter}`;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const query = buildUserFetchUrl({ city });

  const url = `${BASE_URL}${query}&appid=${API_KEY}&units=metric&lang=ja`;

  try {
    const response = await axios.get(url);

    console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
  }
}
