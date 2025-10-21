# Custody Calendar 2026

A React-based web application for creating and managing custody proposals with a visual calendar interface and persistent storage.

🔗 **Repository**: https://github.com/davehedengren/custody-schedule-page

## Features

- **Password-Protected Modes**: Enter "mom" or "dad" to access respective proposal modes
- **Visual Calendar**: View all 12 months of 2026 in a clear grid layout
- **Easy Day Assignment**: Use the palette tool to mark days as Mom (green) or Dad (blue)
- **Real-time Statistics**: Track total nights (with percentages), school days, weekends, and holidays for each parent
- **Persistent Storage**: Automatically saves proposals with timestamps to Replit Database (or localStorage as fallback)
- **Version History**: Each save creates a new timestamped version in your track (Mom or Dad)
- **Proposal Comparison**: Load Mom's and Dad's proposals to highlight disputed days in purple
- **Backup Options**: Export/import JSON files via hamburger menu for data portability
- **School Calendar**: View Provo School District holidays in a collapsible sidebar

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Use

### Authentication
1. **Enter Password**: Type "mom" or "dad" to enter the respective proposal mode
2. **Switch Modes**: Click "Switch Mode" at the top to log out and change modes

### Creating a Proposal
3. **Select a Tool**: Click either "Mom Days" or "Dad Days" from the palette tool
4. **Assign Days**: Click on calendar days to assign them to the selected parent
5. **View Statistics**: See real-time statistics (with percentages) for each parent
6. **Save Your Proposal**: Click "Save to Mom/Dad Track" to create a timestamped version

### Loading & Comparing
7. **Load Proposals**: Use the dropdowns to load any saved Mom or Dad proposal
8. **Compare Proposals**: Select one from each dropdown and click "Compare Selected Proposals"
9. **Disputed Days**: Purple days indicate disagreements between proposals

### Backup (Hamburger Menu)
10. **Export JSON**: Download current proposal as a JSON file for backup
11. **Import JSON**: Upload a previously saved JSON file to restore data

## Deploying to Replit

1. Create a new Repl on Replit
2. Upload all project files
3. Replit should automatically detect it's a Vite project
4. Click "Run" to start the server
5. The app will be available at your Repl's URL

## Technical Details

- **Framework**: React 18
- **Build Tool**: Vite
- **Storage**: Replit Database (@replit/database) with localStorage fallback
- **Authentication**: Password-based mode selection (hardcoded: "mom" / "dad")
- **Styling**: Pure CSS (no framework dependencies)
- **Data Format**: JSON with date-based assignments and timestamps

## School Year Information

- First Day of School: August 19, 2026
- Last Day of School: May 22, 2026
- Summer Vacation: May 22 - August 19

All Provo School District holidays are pre-configured and visible in the sidebar.

