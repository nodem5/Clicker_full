# Clicker Hub

Clicker Hub is a central hub for accessing and exploring different versions of the Clicker game. Each version offers unique features and gameplay mechanics.

## Features

- **Clicker V1**: A classic version of the game with basic functionalities.
- **Clicker V2**: An enhanced version with new features and improvements.
- **Comments Section**: Users can leave comments and view random comments from others.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive Design**: Optimized for various screen sizes.

## Project Structure

```
project-folder/
├── clickerV1.0/
│   ├── clicker.html
│   ├── clicker.css
│   └── clicker.js
├── clicker v2.0/
│   ├── clicker.html
│   ├── style.css
│   └── script.js
├── hub_main.html
├── hub_komentarze.php
├── assets/
│   ├── css/
│   └── js/
└── images/
```

## How to Run

1. Open `hub_main.html` in your browser to access the Clicker Hub.
2. Navigate to the desired version of the Clicker game or the comments section.

## Full Setup Instructions

1. Install XAMPP and start it.
2. Ensure Apache and MySQL services are running.
3. Create a database named `clicker_hub` and import the `comments_model.sql` file to set up the `comments` table.
4. Move all project files to `C:\xampp\htdocs`.
5. Open a browser and navigate to `http://localhost/hub_main.html`.

## Requirements

- **XAMPP**: Install and configure XAMPP to run the PHP-based comments section.
- **Database Setup**: Create a MySQL database named `clicker_hub` and import the `comments_model.sql` file to set up the `comments` table.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- PHP (for the comments section)
- MySQL (for storing comments)

## Author

Created by **Nodem5**.