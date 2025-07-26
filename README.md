# intdec - a fake terminal that breaks down integers

Intdec is an experimental web interface for integer decomposition and base conversion. It features a retro terminal-style UI rendered entirely in the browser using vanilla JavaScript and [Anime.js](https://animejs.com/).

## Purpose

This project is primarily created to learn through feedback. After finishing it, I plan to seek feedback from various communities to refactor and improve the project. It's not intended to be a truly useful tool since there are already many professionally made alternatives. Instead, I wanted this to be a fun experience for myself and (hopefully) others.

## Running

Due to dependency on ES modules, it's recommended to run the app on a local server. Example would include the Live Server addon on Visual Studio Code.

## External dependency

The project loads Anime.js from a CDN (`https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js`). Ensure you have an internet connection when opening the page so the animation library can load successfully.

## Fonts

This project uses the **Web437 IBM VGA 8x16** and **Web437 IBM VGA 8x16-2x** font from:  
[The Ultimate Oldschool PC Font Pack](http://int10h.org/oldschool-pc-fonts/) by **VileR** © 2016–2020 VileR

- Licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Original font files unmodified
- Provided “as-is”, without warranty of any kind

## Features

### Animated boot sequence with simulated system logs:

![Boot sequence](https://github.com/user-attachments/assets/74b24d84-8bd8-475b-a644-277e9a825d68)

### Interactive virtual keyboard:

![Keyboard interaction](https://github.com/user-attachments/assets/fc1b0a05-5ce3-4286-8e1f-a9ef300ddab0)

- Supports Caps Lock and Shift
- Responds to both on-screen and physical key presses(physical key feedback is WIP)

### Visual overflow feedback when input exceeds the allowed length:

![Overflow feedback](https://github.com/user-attachments/assets/ef3db137-b01f-4ce0-9561-0cddc1832f75)

## Work in Progress

### Math logic integration

- At the moment, even though the integer decomposition logic is ready, it's still not integrated with the visuals
- A simple command parser is in progress. It will eventually allow various terminal-style commands, for example, changing the accent color or interacting directly with the integer data.

### Unification of all constant variables into a separate settings module

- I would like to go through the fake terminal files and allow the settings to be changed easily within one file

### Sound implementation

- Right now, everything is silent. I plan to add sounds that (in my opinion) will elevate the experience such as keypress sounds, ambient noise, and boot sounds.
