# Web Development Project 6 - ClimaPulse

Submitted by: **Azamat**

This web app: **ClimaPulse is a real-time global weather intelligence dashboard that aggregates and processes meteorological statistics from 16 world-class metropolitan hubs (including the newly added Tashkent, Uzbekistan) using the Open-Meteo API. In Part 2, we integrated client-side routing using React Router and dynamic data visualization utilizing Recharts.**

Time spent: **4.5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset


The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [x] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

  
The following **additional** features are implemented:

* [x] **Interactive Guided Exploration Preset Tours**: Clicking preset buttons (e.g. Desert Heat, Nordic Chill, Gale-Force Winds) automatically sets specific search and filter criteria.
* [x] **Dynamic Extrema Highlights**: Real-time identification of the hottest, windiest, and most humid hubs in the active filtered view.
* [x] **Added Tashkent (Uzbekistan)**: Appended Tashkent manually to verify fully data-driven dashboard compilation.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://i.imgur.com/D0lCacJ.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ScreenToGif.  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Vite 8 bundle compilation required manual installation of react-is due to a peer-dependency discrepancy in Recharts 3.0.

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
