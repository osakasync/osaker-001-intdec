# intdec - a fake terminal that breaks down integers

Intdec is an experimental web interface for integer decomposition and base conversion. It features a retro terminal-style UI rendered entirely in the browser using vanilla JavaScript and [Anime.js](https://animejs.com/).

**Live demo**: [https://osakasync.github.io/osaker-001-intdec/](https://osakasync.github.io/osaker-001-intdec/)

## Table of Contents

- [Purpose](#purpose)
- [Running](#running)
- [External dependency](#external-dependency)
- [Fonts](#fonts)
- [Project Structure](#project-structure)
- [Command list](#command-list)
- [Features](#features)
- [Work in Progress](#work-in-progress)

## Purpose

This project is primarily created to learn through feedback. After finishing it, I plan to seek feedback from various communities to refactor and improve the project. It's not intended to be a truly useful tool since there are already many professionally made alternatives. Instead, I wanted this to be a fun experience for myself and (hopefully) others.

## Running

Due to dependency on **ES modules**, it's recommended to run the app on a local server. Example would include the **Live Server** addon on **Visual Studio Code**.

## External dependency

The project loads Anime.js from a CDN (`https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js`). Ensure you have an internet connection when opening the page so the animation library can load successfully.

## Fonts

This project uses the **Web437 IBM VGA 8x16** and **Web437 IBM VGA 8x16-2x** font from:  
[The Ultimate Oldschool PC Font Pack](http://int10h.org/oldschool-pc-fonts/) by **VileR** © 2016–2020 VileR

- Licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Original font files unmodified
- Provided “as-is”, without warranty of any kind

## Project Structure

<details><summary><strong>Click to expand</strong></summary>

```bash
intdec/
├── index.html                  # Entry point of the application
├── .gitignore
├── README.md                   # Project documentation (this file)
├── assets/
│   ├── fonts/                  # Web437 IBM VGA font files + font license
│   │   ├── Web437_IBM_VGA_8x16.woff
│   │   ├── Web437_IBM_VGA_8x16-2x.woff
│   │   ├── FONT_LICENSE.TXT
│   │   └── FONT_README.TXT
│   ├── js/
│   │   ├── core/
│   │   │   ├── ambient/        # Background ambient
│   │   │   ├── boot/           # Fake boot sequence
│   │   │   ├── keyboard/       # Virtual keyboard
│   │   │   ├── parser/         # Command parser
│   │   │   ├── decomposer.js
│   │   │   ├── feedback.js     # Visual warning/error feedback
│   │   │   ├── main.js
│   │   │   ├── settings.js     # Global settings
│   │   │   ├── ui.js
│   │   │   └── utils.js
│   │   └── logic/
│   │       ├── baseconverter.js
│   │       └── intdecomposer.js
│   └── styles/
│       └── style.css           # Terminal layout and visual style
```

</details>

## Command list

<details><summary><strong>Click to expand</strong></summary>

| Command                 | Description                        |
| ----------------------- | ---------------------------------- |
| `binary <number>`       | returns binary representation      |
| `octal <number>`        | returns octal representation       |
| `hex <number>`          | returns hexadecimal representation |
| `base <number> <base>`  | converts number to a given base    |
| `digitsum <number>`     | sum of digits                      |
| `bitlength <number>`    | bit length of number               |
| `ispalindrome <number>` | is it a palindrome?                |
| `isprime <number>`      | is it prime?                       |
| `poweroftwo <number>`   | is it a power of two?              |
| `factors <number>`      | prime factorization                |
| `divisors <number>`     | all divisors of number             |
| `collatz <number>`      | collatz step count                 |
| `scientific <number>`   | scientific notation                |
| `unicode <number>`      | unicode character                  |
| `roman <number>`        | roman numeral                      |
| `funfact <number>`      | trivia for that number             |
| `summary <number>`      | full breakdown                     |
| `cls`                   | clears the output window           |

</details>

## Features

### Animated boot sequence with simulated system logs

![Boot sequence](https://github.com/user-attachments/assets/625ac92f-1cdf-4e54-a5d6-433407bec769)

### Interactive virtual keyboard

![Keyboard interaction](https://github.com/user-attachments/assets/fa84f326-fff4-48ff-9942-f8981fd57b5f)

- Supports Caps Lock and Shift
- Responds to both on-screen and physical key presses **(physical key feedback is WIP)**

### Command parser with visual feedback (warning, error)

#### Correct command

![Correct Command](https://github.com/user-attachments/assets/98ac9383-98cc-4f40-a914-42ad879dab4d)

#### Correct command with wrong arguments

![Correct command with wrong arguments](https://github.com/user-attachments/assets/08d6cd94-c990-4e5f-ac53-bdc79ccc9d4d)

#### Wrong command

![Wrong Command](https://github.com/user-attachments/assets/4506baf0-4981-44ee-a276-ec89d3b37557)

## Planned Features

### Sound implementation

Currently, the interface is completely silent. I plan to add audio feedback such as:

- Keypress sounds
- Ambient terminal noise
- Boot-up effects

### Virtual keyboard integration with the physical one

Right now, the virtual keyboard doesn't react to physical keypresses. I'd like to sync them, so typing on a real keyboard also triggers animations on the virtual keys.

### Mobile responsiveness

The site is currently impractical to use on mobile devices. I plan to create a separate UI layout optimized for phones and smaller screens.
