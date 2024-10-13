# Frontend Mentor - Bento grid solution

This is a solution to the [Bento grid challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/bento-grid-RMydElrlOj). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size

### Screenshot

![screenshot.png](./assets/images/screenshot.png)

### Links

- Solution URL: [https://www.frontendmentor.io/solutions/bento-grid-solution-WrVKknswZL](https://www.frontendmentor.io/solutions/bento-grid-solution-WrVKknswZL)
- Live Site URL: [https://crtykwod.github.io/Frontend-Mentor/junior/d001/bento_grid/](https://crtykwod.github.io/Frontend-Mentor/junior/d001/bento_grid/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

This challenge was deffinetely a huge boost in my understanding of CSS Grid display. As you can see in:
```CSS
@media only screen and (min-width:64rem) {
   main {
    grid-template-columns: 16rem 34rem 16rem;
    grid-template-rows: 20.3125rem 15.375rem 15.375rem;
  }
}
```
I tried many many many things before just putting a direct width and height there, I tried doing it with with `grid-auto-flow:;`, tried with `grid-template-area` and also with 12 columns, lol. So, all this try after try helped me a lot at understading better all the concept behind CSS Grid.

### Continued development

I still have a lot to develop on my general CSS Skills!!!

## Author

- GitHub - [Carlos Samuel](https://github.com/Crtykwod)
- Frontend Mentor - [@Crtykwod](https://www.frontendmentor.io/profile/Crtykwod)