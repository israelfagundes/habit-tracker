  <h1 align="center">
  <br>
  <img src="./.github/logo.svg" alt="Habits" width="200">
  <br>
  <br>
</h1>

<br>

<h2 align="center">Habit tracker for you to track your daily habits :)</h2>

<br/>

<div align="center">
  <img src=".github/habits.gif" alt="demo-mobile" height="425">
</div>

<br/>

# :camera: **Screenshots**

### :computer: Web

<div align="center">
  <img src=".github/screen1.png" alt="Main Screen" height="425">
  <img src=".github/screen2.png" alt="New Entry" height="425">
  <img src=".github/screen3.png" alt="Report" height="425">
</div>

### :iphone: Mobile

<div align="center">
  <img src=".github/mobile1.png" alt="demo-mobile" height="425">
  <img src=".github/mobile2.png" alt="demo-mobile" height="425">
  <img src=".github/mobile3.png" alt="demo-mobile" height="425">
</div>

<br>

<hr>
<br>

## :suspect: **Techs**

<br>

### **This app was developed using:**

<br>

#### **Web app:**
- ⚙️ **Vite**
- 📝 **Typescript**
- ⚛️ **ReactJS**
- 🎨 **TailwindCSS**
- 🎨 **RadixUI**

#### **Mobile app:**
- ⚛️ **React Native**
- ⚛️ **Expo**
- ⚙️ **React Navigation**
- 🤹‍♂️ **React Native Reanimated**
- 🎨 **Nativewind/TailwindCSS**

#### **API:**
- 🗂️ **SQLite**
- 🐯 **Fastify**
- 🔷 **Prisma**
- 🔒 **Zod**

<br>

## :godmode: **Run this project**

1. Clone this repo `git clone https://github.com/israelfagundes/habit-tracker.git`
2. On the project's root folder, run `make install` to install all dependencies

### :suspect: **API**

1. Inside `server` folder, rename `.env.sample` file to `.env`
2. On the project's root folder, run `make up_server` to start server on `https://localhost:3333`

### :suspect: **Web Client**

1. Inside `web` folder, rename `.env.sample` file to `.env`
2. Inside `.env` file, fill `API_URL` variable with your API url.
3. On the project's root folder, run `make up_web` to start web client on `https://localhost:5173`

### :suspect: **Mobile Client**

1. Inside `mobile` folder, rename `.env.sample` file to `.env`
2. Inside `.env` file, fill `API_URL` variable with your API url (must use the IP address instead of localhost).
3. On the project's root folder, run `make up_mobile` to start metro bundler.
4. Alternatively, you can run `make up_android` to run android emulator, or `make up_ios` to run xcode simulator (if you already have xcode properly installed and set up).

<br>
<br>
<br>
<br>
<br>
<br>

###### :feelsgood: Made with :hearts: and :droplet: (tears) :feelsgood:
