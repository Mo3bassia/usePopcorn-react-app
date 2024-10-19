# 🍿 usePopcorn React App

![Project Preview](./public/preview.png)

This is a React application that allows users to search for movies using the OMDB API. The app displays search results, allows users to add movies to a watched list, and provides key details such as IMDb ratings and runtime.

🔗 **Live Demo:** [usePopcorn](https://usepopcorn-mo3bassias-projects.vercel.app)

---

## ✨ Features

- 🔍 **Search Movies**: Users can search for any movie by title, powered by the OMDB API.
- 🍿 **Add to Watched List**: Users can add movies to their "Watched" list for easy reference.
- ⭐ **IMDb Ratings**: Display movie details, including IMDb ratings and runtime.
- 🧮 **Average Ratings**: The app calculates and displays the average IMDb rating, user rating, and runtime of watched movies.
- 🔔 **Dynamic Title Update**: The app dynamically updates the page title based on the selected movie.
- ❌ **Watched List Management**: Users can easily remove movies from the "Watched" list.
- 💾 **Local Storage Integration**: The app saves the watched list in the browser's `localStorage` to persist user preferences across sessions.
- ⏳ **Loading Indicators**: Shows a loading indicator while fetching movies from the API.
- 🛑 **Error Handling**: Graceful error handling when no movies are found or when there’s a network issue.
- ⌨️ **Keyboard Shortcuts**: Users can use the `Escape` key to close the movie details and clear the search input. The `Enter` key focuses on the search input for quick access.

---

## 🛠️ Technologies Applied

- ⚛️ **React**: Utilized React hooks (`useState`, `useEffect`) for managing state and side effects.
- 📡 **OMDB API**: Integrated with the OMDB API to fetch real-time movie data.
- 🎨 **CSS Modules**: Used for styling different components to ensure maintainable and scalable styles.
- 💫 **Custom Hooks**: Implemented custom hooks for various functionalities like handling selected movies and updating the title dynamically.
- 🌟 **StarRating Component**: Added a custom component for handling user ratings with stars.
- 🧮 **Utility Functions**: Created a reusable function to calculate the average of ratings and runtime.
- ⌨️ **Keyboard Event Listeners**: Managed keyboard events, such as `Escape` to close movie details, clear search input, and `Enter` to focus the search bar for smoother user experience.
- 🔄 **Component Reusability**: Made components like `MovieList`, `WatchedList`, and `Box` reusable and modular.

---

Feel free to check out the live demo and explore the features! 😊

- **I am really sorry for blurring images and posters of films, this is for private reasons**
- **Responsive Design**: Ensures the app looks great on any device.

Enjoy your movie experience with **usePopcorn**! 🍿✨

---

## 🔄 Changelog

### [1.5.0] - 2024-10-19

- ⌨️ **Keyboard Shortcuts**: Added functionality for the `Escape` key to close movie details and clear the search input. Also, added the ability to focus the search input field using the `Enter` key for smoother interaction.

### [1.1.0] - 2024-10-19

- 💾 **Local Storage Integration**: Added functionality to save the watched list in local storage for persistence.
- 🐛 **Bug Fixes**: Resolved issues with movie details not displaying correctly.
