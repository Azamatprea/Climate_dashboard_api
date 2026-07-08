# Web Development Project 5 - ClimaPulse

Submitted by: **Azamat**

This web app: **ClimaPulse is a real-time global weather intelligence dashboard that aggregates and processes meteorological statistics from 15 world-class metropolitan hubs using the Open-Meteo API.**

Time spent: **2.5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays at least 15 unique items, one per row.
  - The dashboard includes multiple attributes per row: Weather condition status badges, custom temperature indicators, dynamic humidity progress bars, wind speeds, and rotated wind direction pointers.
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data**
  - The app dashboard includes three summary statistics computed dynamically:
    - **Global Mean Temp** (Average temperature across all cities)
    - **Peak Wind Velocity** (Maximum wind speed recorded)
    - **Clear Sky Ratio** (Percentage of cities with clear/sunny skies)
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query (city or country name).
  - The list of results dynamically updates as the user types into the search bar.
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using **different attributes** than the search bar (Continent and Weather Condition category).
  - The filter **correctly** filters items in the list, only displaying items matching the filter attributes.
  - The dashboard list dynamically updates as the user adjusts the filters.

The following **optional** (stretch) features are implemented:

- [x] Multiple filters can be applied simultaneously (Search query, Continent selection, Weather condition type, wind speed minimums, and temperature bounds work together).
- [x] Filters use different input types
  - *Text Input:* Search bar.
  - *Dropdown selects:* Continent and Weather Condition.
  - *Range slider:* Minimum Wind Speed setting.
  - *Number inputs:* Temperature bounds boundaries.
- [x] The user can enter specific bounds for filter values (Min and Max temperatures in Celsius, Min wind speed in km/h).

The following **additional** features are implemented:

* [x] **Detailed Modal Panel:** Clicking "Details" on any city displays a glassmorphic modal with advanced coordinates, elevation, timezone info, and a climate advisory statement.
* [x] **Live Clock Widget:** A live-running digital clock in the dashboard header that updates every second.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='screenshots/dashboard_walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ScreenToGif.  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

No major challenges were encountered. Care was taken to handle JSX characters correctly by escaping `<` and `>` to `&lt;` and `&gt;` inside the filter selects to prevent parsing errors.

## License

    Copyright [2026] [Azamat]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
