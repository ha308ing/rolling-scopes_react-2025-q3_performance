# React Performance

## After Optimiation

- optimized year selection component to render precomputed select options
- used memoized values in Countries components - resulted in about 2x performance
- using react compiler resulted in about 4x performance

### Filter Countries

![](https://i.postimg.cc/dVN6Ncxd/o2-country-optimized.png)

- reduces Countries component rendering to up to 70ms

#### With Compiler

![](https://i.postimg.cc/7YJDBqh8/co2-country-compiler-2.png)

### Year Selection

![](https://i.postimg.cc/gJz0x1GS/co2-year-optimized.png)

![](https://i.postimg.cc/HLHYNF8Y/co2-year-optimized-2.png)

- reduced Countries rendering from 1s to 200ms

#### With Compiler

![](https://i.postimg.cc/wTkK43zr/co2-year-compiler-2.png)

### Sorting

![](https://i.postimg.cc/K85jmZ2k/co2-sorting-optimized.png)

![](https://i.postimg.cc/tTs4dWVW/co2-sorting-optimized-2.png)

#### With Compiler

![](https://i.postimg.cc/Ls1N70fs/co2-sorting-compiler-2.png)

### Selectin columns

![](https://i.postimg.cc/3NL9MMxP/co2-columns-optimized.png)

- selecting all columns triggers Countries render for 620ms - 670ms
- selecting less or none columns triggers Countries render for 250ms

#### With Compiler

![](https://i.postimg.cc/26XyZTc4/co2-columns-compiler-2.png)

![](https://i.postimg.cc/Jnt4MZrt/co2-columns-compiler-3.png)

## Initial Profiling

### Filter Countries

#### Actions

![](https://i.postimg.cc/k726QwGb/co2-country.webp)

#### Profiling

![](https://i.postimg.cc/prM5pm5x/co2-country-profile.webp)

![](https://i.postimg.cc/PfvBHPMJ/2025-08-31-17-20-59.png)

#### Conclusion

- Changing filter country updates `Countries` component which triggers rerender of _year_ and _sort_ selectors. And _year_ selector takes the most time to render

- `Countries` component that hosts all the state and data filtering and table is rendered for 73.6ms to 216ms.

### Selecting Year

#### Actions

![](https://i.postimg.cc/ssDhT7w3/co2-year.webp)

#### Profiling

![](https://i.postimg.cc/CKFgLSxt/co2-year-profile.png)

#### Conclusion

- Changing Year triggers render of Countries for about 1s

### Sorting

#### Actions

![](https://i.postimg.cc/7DvWpY2C/co2-sorting.webp)

#### Profiling

![](https://i.postimg.cc/wj7YP03y/co2-sorting-profile.webp)

#### Conclusion

- Changing Sorting triggers render of Countries for about 300ms

### Selecting Columns

#### Actions

![](https://i.postimg.cc/08vNWJs8/co2-columns.webp)

#### Profiling

![](https://i.postimg.cc/hvWYGRL6/co2-columns-profile.png)

![](https://i.postimg.cc/J47q5hzK/co2-columns-profile-ranked.png)

#### Conclusion

- Changing columns triggers render of Countries for about from 500ms to 1s, based on number of selected columns

## Application Requirements

1. Fetch and Display Data
   - Fetch CO2 emissions data by countries from a large hierarchical JSON file (~100MB) ([JSON](https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json), [co2-data](https://github.com/owid/co2-data)). Each country/region is a root-level key with an array of yearly data objects.
   - Use React Suspense for data loading. Show a fallback (spinner or skeleton) while loading or parsing data to keep the UI responsive.
   - Display a list of countries, showing name, population (latest year by default), and ISO code (if available). For each country, show a table of yearly data with required columns: year, population, co2, co2_per_capita. If a value is missing, display "N/A".
   - Add a modal widget that lets users select additional columns to display from the available yearly data fields (e.g., methane, oil_co2, temperature_change_from_co2, etc.).

2. Year Selection, Filtering, Sorting, and Search
   - Add a year selector at the top to choose which year to display for all countries/regions. When the year changes, briefly highlight updated data.
   - Filter countries by region using a dropdown menu.
   - Search countries by name using a search bar.
   - Sort countries by population (for the selected year) or by name (ascending/descending).

3. Performance Optimization
   - Use **useMemo** to memoize the filtered, searched, and sorted list of countries and selected columns.
   - Use **useCallback** to memoize event handler functions for filtering, searching, sorting, and column selection.
   - Use **React.memo** to wrap components like country cards and data tables to prevent unnecessary re-renders.
   - Use proper key props for lists and tables to avoid reconciliation issues.

## Performance Profiling Task

1. **Initial Profiling with React Dev Tools Profiler**
   - Use the React Dev Tools Profiler to measure the performance of your application (e.g., sorting a column, searching a country, selecting another year, adding/removing columns).
   - Record interactions and analyze the results.
   - Put a brief description of the app performance, including screenshots from the Profiler, in the app's `README.md` file.
   - **Parameters to Check:**
     - **Commit Duration:** Time taken for React to render the committed updates.
     - **Render Duration:** Time taken for individual components to render.
     - **Interactions:** User interactions that triggered the renders.
     - **Flame Graph:** Visual representation of component render times.
     - **Ranked Chart:** Sorted list of components by render duration.

2. **Update the App with React.memo and useMemo**
   - Optimize your application by using `React.memo` and `useMemo` to prevent unnecessary re-renders and memoize values.
   - Perform the same profiling again using the React Dev Tools Profiler.
   - Update the `README.md` file with the updated results and screenshots from the Profiler.
   - **Parameters to Check:**
     - **Commit Duration:** Compare the time taken for React to render the committed updates before and after optimization.
     - **Render Duration:** Compare the time taken for individual components to render before and after optimization.
     - **Interactions:** Analyze if the number of interactions triggering renders has decreased.
     - **Flame Graph:** Compare the visual representation of component render times before and after optimization.
     - **Ranked Chart:** Compare the sorted list of components by render duration before and after optimization.

## Points

Fetch and display country data, including name, population (latest year), and ISO code (if available) - **10 points**

- Display a table of yearly data for each country with required columns (year, population, co2, co2_per_capita) - **10 points**
- Modal widget for selecting additional columns to display - **15 points**
- Year selector to change displayed year for all countries, with highlight on updated data - **15 points**
- Searching countries by name using a search bar - **10 points**
- Sorting countries by population (selected year) or name (asc/desc) - **10 points**
- Using useMemo to memoize filtered, searched, sorted countries and selected columns - **10 points**
- Using useCallback to memoize event handlers for filtering, searching, sorting, and column selection - **10 points**
- Using React Suspense for data loading and fallback UI - **10 points**
