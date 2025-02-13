# Frontend Mentor - Time Tracking Dashboard Solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
  - [Useful Resources](#useful-resources)
- [Author](#author)

## Overview

### The Challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size.
- See hover states for all interactive elements on the page.
- Switch between viewing Daily, Weekly, and Monthly stats.

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My Process

### Built With

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JavaScript (ES6+ features like async/await, fetch, object destructuring, and object lookup)

### What I Learned

During this project, I learned and applied several important concepts, including:

1. **Asynchronous Functions and Fetch**: I used `async/await` to fetch data from a JSON file and dynamically update the user interface. This allowed me to handle asynchronous operations in a cleaner and more efficient way.

   Example:
      ```javascript
      const fetchDataAndUpdate = async () => {
        try {
          const response = await fetch("data.json");
          const data = await response.json();
          populateDOM(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      ```

2. **Object Lookup**: I used an object to map time periods ("daily", "weekly", "monthly") to their respective labels ("Yesterday", "Last Week", "Last Month"). This made the code cleaner and easier to maintain.

   Example:
   ```javascript
   const getTimeLabel = () =>
     ({
       daily: "Yesterday",
       weekly: "Last Week",
       monthly: "Last Month",
     })[timePeriod];
   ```

3. **Object Destructuring**: I used object destructuring to extract properties more concisely, as shown below, where I extracted `title` and `timeframes` from the `item` object.

   Example:
   ```javascript
   const createTimeCard = (item) => {
     const { title, timeframes } = item;
     const hours = timeframes[timePeriod];
     // Rest of the code...
   };
   ```

### Continued Development

In the future, I plan to continue exploring and improving my skills in:

- **Asynchronous Data Handling**: Deepening my understanding of asynchronous operations and how to handle errors and loading states.
- **Performance Optimization**: Learning techniques to improve the performance of web applications, especially regarding data loading and component rendering.

### Useful Resources

- [MDN Web Docs - Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) - Official documentation on asynchronous functions.
- [JavaScript.info - Destructuring Assignment](https://javascript.info/destructuring-assignment) - Detailed guide on object and array destructuring.
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - Official documentation on the Fetch API.
- [Object Lookup Patterns](https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals) - Article on replacing `switch` statements with object literals for value mapping.

## Author

- Website - [Your Name](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)
