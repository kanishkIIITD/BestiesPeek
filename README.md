# BestiesPeek

Discover what your favorite GTA RP streamers are up to — all in one place, with the latest YouTube videos and updates at your fingertips.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## Overview

BestiesPeek is a web application designed for fans of a nopixel GTA Roleplay server. It allows users to effortlessly look up their favorite group of streamers and stay up-to-date with their latest content. The platform aggregates streamer information and fetches recent YouTube videos, giving users a centralized hub to see what their favorite creators are up to in the GTA RP world.

Whether you're a casual viewer or a dedicated follower, BestiesPeek helps you stay in the loop with real-time updates and easy access to the latest action.

## Features

- **User-Friendly Interface:** The application boasts a modern, clean, and simple design, ensuring an intuitive and smooth user experience.
- **Responsive Design:** The app is optimized for all devices—whether desktop, tablet, or mobile—ensuring a consistent and engaging experience across various screen sizes.
- **Real-Time Updates/Notifications:** Provides dynamic, real-time updates such as:
  - Live status of streamers.
  - Instantaneous data (e.g., viewer counts, stream details) to keep users informed.
- **Other Key Features:**
  - Animated Elements: Enhances user engagement with smooth animations and transitions.
  - Category-Based Organization & Sorting: Users can sort streamers based on live status, viewer count, or category for a tailored viewing experience.
  - Dedicated Content Areas: Clear separation of sections (streamers, YouTube videos, credits) makes navigation efficient and user-friendly.
- **Landing Page with Intuitive Navigation:** A well-organized landing page featuring tabs that allow users to seamlessly switch between different sections.
- **Acknowledgment & Credits Section:** A dedicated area that credits the people who granted permission to use their art and YouTube channels.
- **One Piece Inspired Touch:** An engaging fun element inspired by One Piece that adds a playful vibe to the overall design.
- **Dedicated Group Pages:** Separate pages for two distinct groups, each showcasing group-specific artwork.
- **Streamers Display with Advanced Sorting:**
  - Category-Based Organization: Streamers are displayed grouped by category.
  - Sorting Options: Users can sort streamers based on whether they are live, offline, viewer count, or category.
  - Live Streamer Details: When a streamer is online, their current thumbnail, stream title, number of viewers, and category are showcased.
  - Offline Streamer Details: Offline streamers are represented by their profile picture and name.
- **YouTube Videos Section:**
  - A tab dedicated to displaying the latest YouTube videos related to the group.
  - Users can choose to view videos from either of the two channels posting content.
- **Modern & Responsive Design:** The application is modern, animated, clean, and simple, ensuring a seamless and engaging experience on both desktop and mobile devices.

## Tech Stack

List the primary technologies used to build the project, for example:

- **Frontend:** React.js, Javascript, Tailwind CSS, etc.
- **Backend:** Node.js, Express.js, etc.
- **Database:** MongoDB, etc.
- **Other Tools:** Redis, etc.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Redis](https://redis.io) / [Memurai](https://memurai.com) for windows

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/BestiesPeek.git
   cd BestiesPeek
   ```

2. **Clone the repository:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables for frontend:**

   ```env
   REACT_APP_CLIENT_ID = your_client_id
   REACT_APP_ACCESS_TOKEN = your_access_token
   REACT_APP_BASE_URL = http://localhost:4000/api/v1
   ```

   To get the client_id and access_token follow the twitch api [reference](https://dev.twitch.tv/docs/api/get-started/).

4. **Configure backend:**

   ```bash
   cd server
   npm install
   ```

5. **Configure Environment Variables for backend:**

   ```env
   MONGO_URI = your_mongo_uri
   PORT = 4000
   CLIENT_ID = your_client_id
   ACCESS_TOKEN = your_access_token
   YOUTUBE_API_KEY = your_api_key
   REDIS_URL =  redis://127.0.0.1:6379
   ```

6. **Run the Application:**

   ```bash
   npm run dev
   ```

   Run backend and frontend simultaneously with the help of concurrently.

### Contact

- Author: Kanishk Singh

- Email: kanishk18044@gmail.com

- GitHub: kanishkIIITD
