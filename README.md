# Tv Show Dashboard

## Introduction

The goal is to build a TV Show Dashboard that categorizes TV shows based on different genres and sorts them by ratings. The application also includes a search feature and a detailed screen for individual shows.

## Features

- Fetch TV Shows from https://www.tvmaze.com/api
- Categorize TV Shows by Genre (Drama, Action, Thriller, etc.)
- Sort Shows by Ratings
- Responsive UI for mobile & desktop
- Search Functionality to filter shows by name
- Detailed Show Screen with full information about a selected show
- Error Handling & Loading States for better UX

## Tech Stack

**Vue.js 3:** Chosen for its reactive capabilities, composition API, and reusability

**TypeScript:** Ensures type safety and better maintainability

**Vue Router:** Manages navigation between pages

**Vuetify:** Used as the UI framework to provide a consistent, responsive, and accessible material design-based experience.

**Playwright:** Implemented for end-to-end testing, ensuring robust UI interactions and application stability.

## Setup Instructions

### Prerequisites

Node.js (v16+ recommended)

NPM or Yarn

### Installation

```bash
git clone https://github.com/LohkreNikita/vue3-tv-dashboard.git

cd vue3-tv-dashboard/app

npm install

npm run dev
```

#### Running Tests

```bash
npx playwright test

```
