# Demo

[![Watch the video](https://img.youtube.com/vi/6wD5FunT4pM/maxresdefault.jpg)](https://youtu.be/6wD5FunT4pM)

# ArrowFin Mobile Assessment

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

> **Note**: This project uses `patch-package` to automatically fix a known issue in `react-native-elements`. The patch is applied via a `postinstall` script.

2. **Install iOS Pods**

   ```bash
   cd ios && pod install && cd ..
   ```

3. **Run the App**
   ```bash
   npx react-native run-ios
   # or
   npx react-native run-android
   ```

## Architecture & Design Decisions

### Clean Separation of Concerns

The project structure separates logic, data, and UI:

- `src/screens`: View controllers (MarketsList, MarketDetail).
- `src/components`: Pure functional UI components (MarketRow, PriceDisplay).
- `src/hooks`: Encapsulated business logic.
- `src/types`: Shared TypeScript interfaces.

### Memory Leaks Prevention

Crucial for this assessment was ensuring no memory leaks occur during navigation.

- **Solution**: The `usePriceTicker` hook implements a `useEffect` cleanup function that explicitly clears the `setInterval` when the component unmounts (navigation back) or when updates are paused.

### Performance Optimizations (Current & Potential)

- **Current**:
  - **State Persistence**: Uses `React Context` to keep price updates in sync across screens without re-fetching.
  - **Infinite Scroll**: Implemented pagination (load on scroll) to handle large datasets efficiently.
  - **Background Handling**: `usePriceTicker` listens to `AppState` to pause CPU-intensive intervals when the app is minimized (background), saving battery and resources.
  - `FlatList` for efficient list rendering.
  - `useCallback` in hooks to prevent unnecessary re-creations of functions.

### Technical Assumptions and Trade-offs

In compliance with the evaluation requirements, the design decisions are detailed below:

1.  **Static Data vs API**:

    - _Assumption_: A static JSON array was requested.
    - _Implementation_: `initialMarkets.json` was created as a base, but an asynchronous API (`fetchMarkets`) was simulated to demonstrate the ability to handle `Loading` states and real pagination, as expected in a production environment.

2.  **Memory Management (Memory Leaks)**:

    - _Requirement_: "Clearing setInterval is mandatory".
    - _Solution_: The logic was abstracted into `usePriceTicker`. The `useEffect` explicitly returns `clearInterval`. It was verified that when navigating back, the timer terminates instantly.

3.  **State Management**:

    - _Decision_: Context API was used instead of `Redux` or `Zustand`.
    - _Reasoning_: For an app of this size, Context is native, lightweight, and sufficient to avoid "prop drilling". It allows the list to maintain the updated price when returning from the detail screen.

4.  **Error Handling**:
    - _Future Improvement_: try/catch blocks were exists an asynchronous calls. Also, Implement "Error Boundaries" to catch UI crashes and display a user-friendly "Something went wrong" screen.

## Future Improvements (Roadmap)

If this application were to go into production with thousands of users and real data, I would implement:

1.  **Shopify FlashList**: I would replace `FlatList` with `FlashList` for superior view recycling performance (5x faster) in lists with thousands of items.
2.  **WebSockets**: Instead of `setInterval`, I would connect to a socket to receive real "tick-by-tick" prices.
3.  **Unit Testing**:
    - Add tests for the `usePriceTicker` hook using _React Hooks Testing Library_.
    - Snapshots to ensure `MarketRow` does not change visually by mistake.
